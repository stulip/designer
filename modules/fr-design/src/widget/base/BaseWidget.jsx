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

export type BaseWidgetProps = {
    canvasRect: Rect,
    designRect: DesignType
};
type State = {};

export class BaseWidget extends React.PureComponent<BaseWidgetProps, State> {
    // 所有属性
    _formData: Object = {};
    widgetRef = React.createRef();
    get widget() {
        return this.widgetRef.current;
    }

    get group() {
        return this.props.groupRef && this.props.groupRef.current;
    }

    constructor(props) {
        super(props);
        let that = this;
        that.state = {};
        that.initWidgetFormData();
    }

    //子类实现
    getName() {
        return "widget";
    }

    componentDidMount() {
        const that = this;
        that.addListener();
    }

    componentWillUnmount() {
        const that = this;
        that.removeListener();
    }

    // 可子类处理
    formatValue(value) {
        return Types.isObject(value) ? value : { value };
    }

    /**
     * 初始化widget表单数据
     */
    initWidgetFormData() {
        let that = this;
        const {value} = that.props;
        const data = that.formatValue(value);
        const formData = {};
        formData[PropsConst.widgetInitialWidth] = false;
        formData[PropsConst.widgetInitialHeight] = false;

        return that._formData = Object.assign(formData, data);
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
            that.widget.addEventListener("mouseleave", that.handleMouseLeave);
            that.widget.addEventListener("mousedown", that.handleMouseDown);
            that.widget.addEventListener("mouseover", that.handleMouseEnter);
            that.widget.addEventListener("click", that.handleClick);
            that.widget.addEventListener("dblclick", that.handleDBLClick);
        }
    }

    removeListener() {
        let that = this;

        if (that.widget) {
            that.widget.removeEventListener("mouseleave", that.handleMouseLeave);
            that.widget.removeEventListener("mousedown", that.handleMouseDown);
            that.widget.removeEventListener("mouseover", that.handleMouseEnter);
            that.widget.removeEventListener("click", that.handleClick);
            that.widget.removeEventListener("dblclick", that.handleDBLClick);
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
        event.preventDefault();
        event.stopPropagation();
        DesignEvent.emit(PropsConst.widgetMouseEnter, event, this);
    };

    /**
     * 失去鼠标焦点
     * @param event
     */
    handleMouseLeave = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        DesignEvent.emit(PropsConst.widgetMouseExit, event, this);
    };

    /**
     * 元素被点击
     * @param event
     */
    handleClick = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        DesignEvent.emit(PropsConst.widgetMouseClick, event, this);
    };

    /**
     * 双击事
     * @param event
     */
    handleDBLClick = (event: MouseEvent): void => {
        DesignEvent.emit(PropsConst.widgetMouseDBLClick, event, this);
    };

    /**
     * 表单数据改变
     * @param formData
     */
    handleChange (formData: Object){
        let that = this;
        that.forceUpdate();
    }

    /**
     * widget 属性, 子类实现
     * @returns Array<Object>
     */
    widgetProps() {
        const that = this;
        that.initWidgetBasicData();
        return [
            { form: "widget.name", type: Form.Const.Type.PanelInput, className: "widget-name" },
            [
                {
                    form: "widget.x",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: true,
                    input: {title: "X ", min: 0}
                },
                {
                    form: "widget.y",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: true,
                    input: {title: "Y ", min: 0}
                }
            ],
            [
                {
                    form: PropsConst.widgetWidth,
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: data => !!data[PropsConst.widgetInitialWidth],
                    input: {title: "宽", min: 0},
                    listener: {
                        key: PropsConst.widgetSize,
                        getValue: da => da.width,
                        setValue: (width, data) => ({width, height: data[PropsConst.widgetHeight]})
                    }
                },
                {
                    form: PropsConst.widgetHeight,
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: data => !!data[PropsConst.widgetInitialHeight],
                    input: {title: "高", min: 0},
                    listener: {
                        key: PropsConst.widgetSize,
                        getValue: da => da.height,
                        setValue: (height, data) => ({height, width: data[PropsConst.widgetWidth]})
                    },
                }
            ],
            { type: Form.Const.Type.Gap }
        ];
    }

    /**
     * 原始表单数据
     * @returns {Object}
     */
    get formData (){
        return this._formData;
    }

    // 子类实现
    renderWidget() {
        return this.props.children;
    }

    render() {
        let that = this;
        return (
            <div className={"group-flow"} ref={that.widgetRef}>
                {that.renderWidget()}
            </div>
        );
    }
}
