/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 10:25
 */
import React from "react";
import type { ItemProps } from "./../FormView";
import { Types, Tools } from "@xt-web/core";

type Props = {
    value: any,
    required: boolean,
    change: (key: string, value: any) => void, // 值改变回调给Form处理
    item: ItemProps
};

type State = {
    value: any,
    error: boolean,
    required: boolean,
    visible: boolean,
    disabled: boolean
};

class BaseItem extends React.Component<Props> {
    state: State = {};

    constructor(props) {
        super(props);
        let that = this;
        let { item } = props;
        that.onChange = that.onChange.bind(that);
        that.setValue = that.setValue.bind(that);
        that.state = that.valueOfProps(props);
    }

    valueOfProps(props) {
        let that = this;
        let { item } = props;
        let state = { error: false, required: props.required };
        state.value = that.getValue(props.value);
        state.disabled = item._disabled = that.isDisable(props, state);
        state.visible = item._visible = that.isVisible(props, state);
        return state;
    }

    // 可重写
    getValue(value): any {
        return value;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let that = this;
        if (nextProps.value !== that.state.value || nextProps.item !== that.props.item) {
            that.setState(that.valueOfProps(nextProps));
        }
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        let that = this;
        return (
            nextProps.value !== that.props.value ||
            nextProps.required !== that.props.required ||
            nextState.value !== that.state.value ||
            nextState.error !== that.state.error ||
            nextState.required !== that.state.required ||
            nextState.disabled !== that.state.disabled ||
            nextState.visible !== that.state.visible
        );
    }

    /**
     * 是否禁用
     * @param props
     * @param state
     * @returns {boolean}
     */
    isDisable = (props?: Object, state) => {
        let that = this;
        let { value } = state || that.state;
        let { item, formData, config } = props || that.props;
        let { union, disabled = false } = item;
        disabled = disabled && Types.isFunction(disabled) ? disabled(formData, value) : disabled;

        return !disabled && union
            ? Array.isArray(union)
                ? !union.every(da => !~da.indexOf("@") && !!that._getSubValue(formData[da], config[da].sub))
                : !~union.indexOf("@") && !that._getSubValue(formData[union], config[union].sub)
            : disabled;
    };

    /**
     * 是否不显示
     */
    isVisible = (props, state) => {
        let that = this;
        let { value } = state || that.state;
        let { formData, item } = props || that.props;
        let { visible = true } = item;
        return visible && Types.isFunction(visible) ? visible(formData, value) : visible;
    };

    /**
     * 设置错误
     * @param error
     */
    setError = (error: boolean = true) => {
        this.setState({ error });
    };

    /**
     * 设置是否需要验证
     * @param required
     */
    setRequired(required: boolean = false) {
        this.setState({ required });
    }

    onChange(data) {
        let that = this;
        let { item } = that.props;
        that.setValue(data);
        // 先设置表单数据
        if (data !== that.value) {
            that.value = data;
            item.onChange && item.onChange(data);
        }
    };

    setValue(data) {
        let that = this;
        let { change, item } = that.props;
        if (data !== that.state.value) {
            // item.onChange && item.onChange(data);
            change && change(item.form, data);
            that.setState({ value: that.getValue(data) });
        }
        that.refreshProps();
    };

    refreshProps() {
        let that = this;
        let { item } = that.props;
        that.setState({
            disabled: (item._disabled = that.isDisable()),
            visible: (item._visible = that.isVisible())
        });
    }

    /**
     * 联动改值, 不触发onChange
     * @param data
     */
    onUnionChange(data) {
        this.setValue(data);
    }

    /**
     * 联动刷新
     */
    onUnionRefresh() {
        let that = this;
        let { change, item } = that.props;
        change(item.form, that.state.value);
        that.refreshProps();
    }

    _getSubValue = (value, sub) => {
        let sVal = Array.isArray(value) ? value[0] : value;
        try{
            return Tools.getItemValue(sVal, sub, Tools.getItemValue(sVal, "name"));
        } catch (e) {
            console.log(e);
        }

        return null;
    };

    //子类实现
    renderItem() {}

    render() {
        let that = this;
        let { index, item, childIndex } = that.props;
        let { visible } = that.state;
        let { top} = item;
        if ( !that.state.visible) return null;
        return (
            <div className={'form-item'}>
                {that.renderItem()}
            </div>
        )
    }
}

export { BaseItem };