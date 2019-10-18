/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 10:16
 */
import React from "react";
import { Types, Tools } from "@xt-web/core";
import { Required } from "./Required";
import "./assets/form-item.pcss";

// 接口请求参数,具体数据参考Paging.js
type ApiProps = {
    host: string,
    uri: string,
    apiType: Function,
    args?: Object | ((data: Object) => Object) // 接口请求参数对象. 如果是方法,参数为整体表单数据
};

type InputProps = {
    //参考TextInput Props
};

type SelectProps = {
    search?: boolean //(default=false)页面是否带搜索
};

type SwitchProps = {};

type CompsProps = {
    defaultValue?: any,
    component: React.DOM,
    props?: Object // 组件属性
};

export type ItemProps = {
    key?: string, // 对象值时, 取值唯一值对比字段名称,
    title: string, //名称, 左边显示名称
    type: string, //类型 = [input,inputs,select,selects,select_normal,text,switch,date]
    form: string, //唯一标识,组件ref,key,表单字段(排除自定义)
    sub?: string, // (default=localName|enName)取值字段(显示用,如type=select)
    field?: string | ((data: Object | string, formData: Object) => string), // 取值字段(表单封装). 如果是方法,参数是表单数据(对象或者数值)
    inlineForm?: boolean, //(default=false)自定义表单数据时,是否拆分对象数据到外层结构
    select?: SelectProps, // type = select, 给select用的值
    input?: InputProps, // type == input, 给input用的值
    switch?: SwitchProps, // type == switch
    api?: ApiProps,
    union?: string | Array<string> | (() => string | Array<string>), // 联动名称(对应联动的form值)(union="@name" @表示刷新联动, 默认值联动)
    visible: boolean | ((formData: Object) => boolean), // 是否显示, 用于,getData会过滤掉
    disabled: boolean | ((formData: Object) => boolean), // 是否禁用
    onChange: (value: any) => void, // 值改变回调
    value: any | ((formData: Object) => any), // 默认值
    unionValue: any | ((unionValue: any, formData: Object) => any), //联动时取值信息, union 为数组时,此值无效.
    _defaultValue?: any, // 根据类型自动生成默认值, 最后处理Form数据的时候使用
    _visible?: boolean, // 是否隐藏
    _disabled?: boolean, // 是否禁用
    renderProps?: CompsProps // 自定义组件
};

// 组件集合
const CompsMap = new Map<String, CompsProps>();

/**
 *
 * 转换前端formData 数据为后端接口需要的格式
 * 比如, 对象, 对象拆分
 * inlineForm: 是否内联Object, 默认false
 * form 表单需要的名称字段
 * field 取值字段, 或者方法返回值
 * @param {Array<Object>} config -> {form: string, field: string|(data)=> {...}, inlineForm: boolean}
 * @param {Object} formData
 * @returns {Object}
 */
const serveData = function(config: Array<Object>, formData: Object) {
    let newData = Object.create(null);
    config.forEach(da => {
        let data = formData[da.form];
        if (Types.isFunction(da.field)) {
            data = Types.isArray(data)
                ? data.map((da2, dx) => da.field(da2, formData, dx))
                : da.field(data || da._defaultValue, formData);

            if (Types.isArray(data) || !da.inlineForm) {
                // newData[da.form] = data;
                Tools.parseFieldData(newData, da.form, data);
            } else {
                let ix = da.form.lastIndexOf(".");
                if (ix !== -1) {
                    let field = da.form.substr(0, ix);
                    Tools.parseFieldData(
                        newData,
                        field,
                        Object.assign(Tools.getItemValue(newData, field, Object.create(null)), data)
                    );
                } else {
                    Object.assign(newData, data);
                }
            }
        } else if (da.field && Types.isArray(data) && data.length && Types.isObject(data[0])) {
            // 数组的情况
            Tools.parseFieldData(newData, da.form, data.map(nd => nd[da.field]));
        } else {
            Tools.parseFieldData(
                newData,
                da.form,
                da.field && data ? data[da.field] : Types.isObject(data) ? Object.assign({}, data) : data
            );
        }
    });
    return newData;
};

/**
 * 转换 props 到 state
 * @param {Object} props
 * @returns {{formData: (*|{}), config}}
 */
const convertState = props => {
    let formData = props.formData || {},
        config = {};
    try {
        let setConfig = da => {
            if (Array.isArray(da.config)) {
                da.config.forEach(da => {
                    Array.isArray(da) ? da.forEach(setConfig) : setConfig(da);
                });
            } else {
                if (!da.form) return;
                // console.log(da);
                da.sub = da.sub || FormView.label;
                config[da.form] = da;
                if (!props.formData || (props.formData && Types.isUndefined(props.formData[da.form]))) {
                    formData[da.form] = da.getValue ? da.getValue(da.value) : da.value;
                }
            }
        };
        // console.groupCollapsed("%c-> Init Fields", "color:#0066CC;");
        props.config.forEach(da => {
            Array.isArray(da) ? da.forEach(setConfig) : setConfig(da);
        });
        // console.groupEnd();
    } catch (e) {
        console.error(e);
    }
    return { formData, config };
};

type Props = {
    formData?: Object,
    config: Object,
    ref?: { current: Object },
    onChange?: (formData: Object) => void // 任意一个item触发onChange, 则会触发此onChange
};

class FormView extends React.Component<Props, State> {
    state = {
        validate: [],
        _config: [],
        _formData: {}
    };

    constructor(props) {
        super(props);
        let that = this;
        that._onChangeTimeout = null;
        that.switchItem = that.switchItem.bind(that);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.config !== state._config || props.formData !== state._formData) {
            return {
                ...convertState(props),
                _config: props.config,
                _formData: props.formData
            };
        }
        return null;
    }

    /**
     * 处理联动
     * @param item
     * @param union 当前改变数据的key
     * @param value
     */
    changeUnion(item, union: string, value: any) {
        let that = this,
            key = item.key || "id";
        let { formData, config } = that.state;
        let defaultData = that.getValue(item.value, formData);
        let isUpEquals =
            defaultData === value ||
            (item.key && Types.isObject(value) && item.key in value && value[key] === (defaultData || {})[key]);

        // 值联动
        let checkUnion = da => {
            const unionKeys = Types.isFunction(da.union) ? da.union(formData) : da.union;
            if (unionKeys && Array.isArray(unionKeys) ? unionKeys.includes(union) : unionKeys === union) {
                // 如果isUpEquals则取联动默认值 item.value,否则去联动值item.unionValue
                let unionValue = isUpEquals
                    ? that.getValue(da.value, formData)
                    : that.getValue(da.unionValue, value || item._defaultValue, formData, da);
                that.refs[da.form] && that.refs[da.form].onUnionChange(unionValue);
            } else if (
                unionKeys && Array.isArray(unionKeys) ? unionKeys.includes(`@${union}`) : unionKeys === `@${union}`
            ) {
                that.refs[da.form] && that.refs[da.form].onUnionRefresh();
            }
        };

        for (let [key, value] of Object.entries(config)) {
            checkUnion(value);
        }
    }

    getValue(value, ...data) {
        return value ? (Types.isFunction(value) ? value(...data) : value) : undefined;
    }

    /**
     * Form数据改变
     * @param key
     * @param value
     */
    onValueChange = (key: string, value: any) => {
        let that = this;
        let { config } = that.state,
            item = config[key];

        that.callbackChange();

        that.state.formData[key] = value;
        that.onChangeValidate(item, key, value);
        that.changeUnion(item, key, value);
    };

    /**
     * 回调onChange
     */
    callbackChange() {
        let that = this;
        if (that.props.onChange) {
            clearTimeout(that._onChangeTimeout);
            that._onChangeTimeout = setTimeout(() => {
                that.props.onChange && that.props.onChange(that.state.formData);
            }, 0);
        }
    }

    onChangeValidate = (item, key, value) => {
        let that = this,
            formItem = that.refs[key];
        let required = that.getRequired(item);
        let errorKey = that.validateItem(item, value);

        formItem.setError(!!errorKey);
        formItem.setRequired(required);
    };

    /**
     * 重置formData数据
     * @param {Object} [formData]
     */
    onReset = (formData = {}) => {
        this.setState({ formData });
    };

    /**
     * 获取表单转换后的数据
     * @returns {*}
     */
    getData = (validate: boolean = false) => {
        let that = this,
            config = [],
            ignoreKeys = [];
        const { formData, config: object = {} } = that.state;
        for (const key in object) {
            if (hasOwnProperty.call(object, key)) {
                const item = object[key];
                ignoreKeys.push(item.form); // 忽略的字段
                if (
                    item.ignore ||
                    (!Types.isUndefined(item._visible) && !item._visible) ||
                    (!Types.isUndefined(item.visible) && !item.visible)
                ) {
                    continue;
                }
                config.push(item);
            }
        }

        if (validate && !that.validate(config, formData)) {
            return null;
        }

        const serveData = serveData(config, formData);

        const nData = {};
        for (const key in formData) {
            if (!~ignoreKeys.indexOf(key)) {
                nData[key] = formData[key];
            }
        }
        return Object.assign(nData, serveData);
    };

    /**
     *
     * @param {String} [errorMsg]
     * @returns {*}
     */
    validateData = (errorMsg?: string) => {
        let that = this;
        let data = that.getData(true);
        if (Types.isNull(data)) {
            let msg = Types.isUndefined(that.props.errorMsg)
                ? errorMsg || I18n.t(241 /*保存失败!*/)
                : that.props.errorMsg;
            // xt.ui.showToast(msg);
        }
        return data;
    };

    /**
     * 设置表单值
     * @param {Object} formData
     * @param {{isGet: boolean, isChange: boolean, config: [options]}} [options] 选项
     */
    setFormData = (formData: Object = {}, options: Object = {}) => {
        let that = this;
        const { isGet: pIsGet = false, isChange: pIsChange = true, config = {} } = options;
        for (const key in formData) {
            let Comp = that.refs[key],
                value = formData[key];
            if (Comp) {
                const { isGet = pIsGet, isChange = pIsChange } = config[key] || {};
                try {
                    let getValue = Comp.props.item.getValue;
                    Comp[isChange ? "onChange" : "onUnionChange"](isGet && getValue ? getValue(formData) : value);
                } catch (e) {
                    console.log(e);
                }
            } else {
                that.state.formData[key] = value;
            }
        }
    };

    /**
     * 设置表单值, 会调用配置项的getValue
     * @param formData
     */
    setGetData = (formData: Object = {}) => {
        for (const key in formData) {
            let Comp = this.refs[key];
            if (Comp) {
                let value = formData[key],
                    getValue = Comp.props.item.getValue;
                try {
                    Comp.onChange(getValue ? getValue(value) : value);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };

    /**
     * 获取Item配置
     * @param {String} name
     * @returns {*}
     */
    getItem(name: String) {
        return this.state.config[name];
    }

    /**
     * 验证值规则, 是否必填,正则等等......
     * @param data
     * @param value
     * @returns {*}
     */
    validateItem(data, value) {
        let that = this;
        if (data.ignore || (typeof data._visible !== "undefined" && !data._visible)) return;
        let required = that.getRequired(data);
        let isEmpty = that._validateEmpty(data, value);

        if (required && isEmpty) return data.form;
        if (isEmpty) return;
        if (Array.isArray(data.rules)) {
            return !!data.rules.find(da => {
                if (da instanceof RegExp) {
                    return !da.test(value);
                } else if (Types.isFunction(da)) {
                    return da(that.state.formData);
                }
            })
                ? data.form
                : undefined;
        } else if (data.rules && data.rules instanceof RegExp && !data.rules.test(value)) {
            return data.form;
        } else if (Types.isFunction(data.rules)) {
            return !data.rules(that.state.formData) ? data.form : undefined;
        }
    }

    _validateEmpty(item, value) {
        let that = this;
        if (Types.isEmpty(value)) {
            return true;
        } else if (Types.isString(value)) {
            return value.trim().length === 0;
        } else if (Types.isObject(value)) {
            return (
                Types.isEmptyObject(value) || !Tools.getItemValue(value, item.sub, Tools.getItemValue(value, "name"))
            );
        } else if (Array.isArray(value)) {
            return !value.length || value.some(da => that._validateEmpty(item, da));
        } else {
            return Types.isEmpty(value);
        }
    }

    /**
     * 验证数据
     * @param config
     * @param formData
     */
    validate(config, formData) {
        let that = this,
            errors = new Set();
        config.forEach(da => {
            let key = that.validateItem(da, formData[da.form]);
            if (key) errors.add(key);
        });
        for (let key of errors) {
            that.refs[key] && that.refs[key].setError();
        }
        return errors.size === 0;
    }

    /**
     * 获取formData数据
     * @returns Object
     */
    getFormData = () => {
        return this.state.formData;
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.config !== this.props.config ||
            nextState.formData !== this.state.formData ||
            nextProps.formData !== this.props.formData
        );
    }

    /**
     * 获取配置是否必填
     * @param item
     * @returns {boolean}
     */
    getRequired = (item): boolean => {
        let { rules } = item;
        let formData = this.state.formData;

        if (rules instanceof Required) {
            return rules.exec(formData);
        } else if (Array.isArray(rules)) {
            return (
                rules.indexOf("required") !== -1 ||
                rules.findIndex(da => da instanceof Required && da.exec(formData)) !== -1
            );
        } else {
            return rules === true;
        }
    };

    switchComps(item: ItemProps, props) {
        let { formData } = this.state;
        let { type, form, renderProps } = item;

        if (!renderProps && CompsMap.has(type)) {
            renderProps = CompsMap.get(type);
        }

        if (renderProps) {
            let { defaultValue = "", component, props: CompProps } = renderProps;
            item._defaultValue = defaultValue;
            item.value = typeof formData[form] === "undefined" ? item._defaultValue : formData[form];
            formData[form] = item.value;
            CompProps && Object.assign(props, CompProps);
            return component;
        }
    }

    switchItem(item, index) {
        let that = this,
            component;
        const key = `${item.form}-${item.title}-${item.type}-${index}`;
        if (Array.isArray(item)) {
            component = (
                <div key={key} className={"item-group"}>
                    {item.map(that.switchItem)}
                </div>
            );
        } else if (Array.isArray(item.config)) {
            const children = item.config.map(that.switchItem);
            if (item.type) {
                component = that.renderComponent(item, { index, children, key });
            } else {
                component = (
                    <div className={item.className} key={key}>
                        {children}
                    </div>
                );
            }
        } else {
            component = that.renderComponent(item, { index, key });
        }
        return component;
    }

    renderComponent(item, props) {
        let that = this;
        const { index, children, key } = props;
        let required = that.getRequired(item);
        let { formData, config } = that.state;
        let value = formData[item.form],
            change = that.onValueChange;

        let compsProps = {
            item,
            value,
            change,
            formData,
            required,
            ref: item.form,
            config
        };

        let Comps = that.switchComps(item, props);

        return Comps ? <Comps key={key} {...compsProps} index={index} children={children} /> : null;
    }

    render() {
        return this.props.config.map(this.switchItem);
    }
}

FormView.label = "label";
/**
 * 转换表单数据为对象格式
 * @param formData
 * @returns {{}}
 */
FormView.getFormatFormData = formData => {
    const data = {};
    for (const [field, value] of Object.entries(formData)) {
        Tools.parseFieldData(data, field, value);
    }
    return data;
};

/**
 * 注册组件
 * @param key
 * @param item
 */
FormView.registerComponent = function(key: string | Array, item?: CompsProps) {
    !CompsMap.has(key) ? CompsMap.set(key, item) : console.log(key + " existed components");
};

export { FormView };
