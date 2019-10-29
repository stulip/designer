/**
 *
 * @author tangzehua
 * @sine 2019-10-11 11:02
 */

// @flow
import React from "react";
import {DesignEvent} from "fr-web";
import {PropsConst} from "../../config/Attribute";
import {Form} from "fr-ui";
import type {DesignType, Rect, WidgetConfigDefined, WidgetProps, WidgetState} from "../../flow/Main.flow";
import {WidgetConfig} from "./base.widget.config";

export type BaseWidgetProps = {
    canvasRect: Rect,
    designRect: DesignType,
    module: Object,// 所有可用属性控件
    parent?: { current: any },
    ...WidgetConfigDefined
};
type State = {};

export class BaseWidget extends React.PureComponent<BaseWidgetProps, State> {
    // 所有属性
    _formData: Object = {};
    widgetRef = React.createRef();

    // 状态标识
    stateId: string = "default";

    get widget() {
        return this.widgetRef.current;
    }

    // 父节点                                                  ....
    get parentWidget(): BaseWidget | null {
        return this.props.parent;
    }

    constructor(props) {
        super(props);
        let that = this;
        that.state = {};
        // 更新回调
        that.onUpdate = null;
        that._styles = null;
        that._widgetProps = null;
        // 初始化为默认状态属性
        that.initWidgetState();
    }

    initWidgetState() {
        const that = this;
        const {widgetProps: {[that.stateId]: widgetProps} = {}} = that.props;

        that.formData = that.createWidgetProps(widgetProps);
    }

    /**
     * 创建子widget
     * @param {Array<Object>} widgetNames
     * @returns {*}
     */
    createWidget(widgetNames) {
        const that = this;
        const {widgetMap, canvasRect, designRect, module} = that.props;

        return widgetNames.map(cid => {
            const widget = widgetMap.get(cid);
            if (!widget) return null;
            const Comp = module[widget.component];

            return Comp && (
                <Comp
                    key={cid}
                    {...widget}
                    canvasRect={canvasRect}
                    designRect={designRect}
                    widgetMap={widgetMap}
                    module={module}
                    parent={that}
                />
            )
        });
    }

    //子类实现
    getName() {
        return "widget";
    }

    componentDidMount() {
        const that = this;
        that.props.widgetMap && that.addListener();
    }

    componentWillUnmount() {
        const that = this;
        that.props.widgetMap && that.removeListener();
    }

    componentDidUpdate(prevProps, prevState) {
        let that = this;
        that.updateBasicData();
        that.onUpdate && that.onUpdate();
    }

    // 子类实现, 默认值
    getDefaultConfig() {
        const that = this;
        const name = that.props.name;
        return {
            [PropsConst.widgetName]: name || that.getName(),
            [PropsConst.widgetInitialWidth]: false,
            [PropsConst.widgetInitialHeight]: false,
        };
    }

    // 子类可继承
    createWidgetProps(config) {
        return Object.assign({}, this.getDefaultConfig(), config);
    }

    addListener() {
        let that = this;

        if (that.widget) {
            that.widget.addEventListener("mouseleave", that.handleMouseLeave, false);
            that.widget.addEventListener("mousedown", that.handleMouseDown, true);
            that.widget.addEventListener("mouseover", that.handleMouseEnter, false);
            that.widget.addEventListener("click", that.handleClick, false);
        }
    }

    removeListener() {
        let that = this;

        if (that.widget) {
            that.widget.removeEventListener("mouseleave", that.handleMouseLeave);
            that.widget.removeEventListener("mousedown", that.handleMouseDown);
            that.widget.removeEventListener("mouseover", that.handleMouseEnter);
            that.widget.removeEventListener("click", that.handleClick);
        }
    }

    handleMouseDown = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
    };

    /**
     * 获得鼠标焦点
     * @param event
     */
    handleMouseEnter = (event: MouseEvent): void => {
        DesignEvent.emit(PropsConst.widgetMouseEnter, event, this);
    };

    /**
     * 失去鼠标焦点
     * @param event
     */
    handleMouseLeave = (event: MouseEvent): void => {
        DesignEvent.emit(PropsConst.widgetMouseExit, event, this);
    };

    /**
     * 元素被点击
     * @param event
     */
    handleClick = (event: MouseEvent): void => {
        event.preventDefault();
        DesignEvent.emit(PropsConst.widgetMouseClick, event, this);
    };

    /**
     * 表单数据改变
     * @param formData
     */
    handleChange(formData: Object) {
        let that = this;
        that.forceUpdate();
    }

    /**
     * 是否禁用宽度改变
     * @returns {boolean}
     */
    getBasicConfig() {
        return {
            widgetX: {min: 0, disabled: true},
            widgetY: {min: 0, disabled: true},
            widgetWidth: {min: 0, disabled: true},
            widgetHeight: {min: 0, disabled: true}
        };
    }

    updateBasicData() {
        const that = this;
        const data = that.formData;
        data[PropsConst.widgetX] = that.widget.offsetLeft;
        data[PropsConst.widgetY] = that.widget.offsetTop;

        if (!data[PropsConst.widgetInitialWidth]) {
            data[PropsConst.widgetWidth] = that.widget.offsetWidth;
        }

        if (!data[PropsConst.widgetInitialHeight]) {
            data[PropsConst.widgetHeight] = that.widget.offsetHeight;
        }
    }

    /**
     * widget 属性, 子类实现
     * @param {Array<WidgetProps>} [child]
     * @returns Array<WidgetProps>
     */
    widgetProps(child: Array<WidgetProps> = []) {
        const basic = this.getBasicConfig();
        this.updateBasicData();
        return WidgetConfig({basic});
    }

    /**
     * 获取widget属性
     * @returns {Array<WidgetProps>}
     */
    getWidgetProps(): [WidgetProps] {
        const that = this;
        return that._widgetProps = that._widgetProps || that.widgetProps();
    }

    /**
     * 获取widget states
     * @returns {[WidgetState]}
     */
    getWidgetStates(): [WidgetState] {
        const that = this;
        const {states = []} = that.props;
        return states;
    }

    /**
     * 切换状态
     * @param stateId
     */
    switchStates(stateId: string) {
        this.stateId = stateId;
    };

    /**
     * 原始表单数据
     * @returns {Object}
     */
    get formData() {
        return this._formData;
    }

    set formData(fromData) {
        this._formData = fromData;
    }

    // 获取style 对象
    get styles() {
        const that = this;
        if (!that._styles) {
            that._styles = Form.View.getFormatFormData(this.formData);
            setTimeout(function () {
                that._styles = null;
            }, 0);
        }
        return that._styles;
    }

    // 子类实现
    renderWidget(widgets) {
        const that = this;
        if (!Array.isArray(widgets) || !widgets) return widgets;
        return that.createWidget(widgets);
    }

    renderChild(options) {
        return this.renderWidget(this.props.children);
    }

    render() {
        let that = this;
        const {cid} = that.props;
        return (
            <div className={"group-flow"} ref={that.widgetRef} data-cid={cid}>
                {that.renderChild()}
            </div>
        );
    }
}
