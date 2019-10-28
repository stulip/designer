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
import type {DesignType, Rect} from "../../flow/Main.flow";
import {Types} from "@xt-web/core";
import {WidgetConfig} from "./base.widget.config";

export type BaseWidgetProps = {
    canvasRect: Rect,
    designRect: DesignType,
    parent?: { current: any }
};
type State = {};

export class BaseWidget extends React.PureComponent<BaseWidgetProps, State> {
    // 所有属性
    _formData: Object = {};
    widgetRef = React.createRef();

    get widget() {
        return this.widgetRef.current;
    }

    // 父节点
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
        that.formData = that.createWidgetProps(props.widgetProps);
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
        that.onUpdate && that.onUpdate();
    }

    // 子类实现, 默认值
    getDefaultConfig() {
        return {
            [PropsConst.widgetInitialWidth]: false,
            [PropsConst.widgetInitialHeight]: false,
        };
    }

    // 子类可继承
    createWidgetProps(config) {
        return Object.assign({}, this.getDefaultConfig(), config);
    }

    // 初始化 widget 基础属性
    initWidgetBasicData() {
        let that = this;
        if (!that.widget || !Types.isUndefined(that._formData["widget.name"])) return;
        const data = that.formData;

        data[PropsConst.widgetName] = that.getName();
        data[PropsConst.widgetX] = that.widget.offsetLeft;
        data[PropsConst.widgetY] = that.widget.offsetTop;
        data[PropsConst.widgetWidth] = that.widget.offsetWidth;
        data[PropsConst.widgetHeight] = that.widget.offsetHeight;
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

    /**
     * widget 属性, 子类实现
     * @param {Array<Object>} [child]
     * @returns Array<Object>
     */
    widgetProps(child: Array<Object> = []) {
        const that = this;
        that.initWidgetBasicData();
        const basic = that.getBasicConfig();
        return WidgetConfig({basic});
    }

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
