/**
 *
 * @author tangzehua
 * @sine 2019-10-11 11:02
 */

// @flow
import React, { Fragment } from "react";
import { DesignEvent } from "fr-web";
import { EventConst } from "../../config/Attribute";
import { Form } from "fr-ui";
import type { DesignType, Rect, Size } from "../../flow/Main.flow";
import { Types } from "@xt-web/core";
import {observable, action} from "mobx";
import {observer} from "mobx-react";

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
        const { value } = that.props;
        const formData = that.formatValue(value);
        return that._formData = Object.assign({}, formData);
    }

    // 初始化 widget 基础属性
    initWidgetBasicData() {
        let that = this;
        if (!that.widget || !that.group || !Types.isUndefined(that._formData["widget.name"])) return;
        const widgetRect = that.widget.getBoundingClientRect();
        const groupRect = that.group.getBoundingClientRect();

        that._formData = {
            ...that._formData,
            "widget.name": that.getName(),
            "widget.width": widgetRect.width,
            "widget.height": widgetRect.height,
            "widget.x": widgetRect.x - groupRect.x,
            "widget.y": widgetRect.y - groupRect.y
        };
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
        DesignEvent.emit(EventConst.widgetMouseEnter, event, this);
    };

    /**
     * 失去鼠标焦点
     * @param event
     */
    handleMouseLeave = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        DesignEvent.emit(EventConst.widgetMouseExit, event, this);
    };

    /**
     * 元素被点击
     * @param event
     */
    handleClick = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        DesignEvent.emit(EventConst.widgetMouseClick, event, this);
    };

    /**
     * 双击事
     * @param event
     */
    handleDBLClick = (event: MouseEvent): void => {
        DesignEvent.emit(EventConst.widgetMouseDBLClick, event, this);
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
     * 是否禁用宽度改变
     * @returns {boolean}
     */
    getBasicConfig() {
        return {
            widgetX: { min: 0, disabled: true },
            widgetY: { min: 0, disabled: true },
            widgetWidth: { min: 0, disabled: false },
            widgetHeight: { min: 0, disabled: false }
        };
    }

    /**
     * widget 属性, 子类实现
     * @returns Array<Object>
     */
    widgetProps() {
        const that = this;
        that.initWidgetBasicData();
        const basic = that.getBasicConfig();
        return [
            { form: "widget.name", type: Form.Const.Type.PanelInput, className: "widget-name" },
            [
                {
                    form: "widget.x",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: basic.widgetX.disabled,
                    input: { title: "X ", min: basic.widgetX.min, max: basic.widgetX.max }
                },
                {
                    form: "widget.y",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: basic.widgetY.disabled,
                    input: { title: "Y ", min: basic.widgetY.min, max: basic.widgetY.max }
                }
            ],
            [
                {
                    form: EventConst.widgetWidth,
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: basic.widgetWidth.disabled,
                    input: { title: "宽", min: basic.widgetWidth.min, max: basic.widgetWidth.max },
                    listener: {
                        key: EventConst.widgetSize,
                        getValue: da => da.width,
                        setValue: (width, data) => ({ width, height: data[EventConst.widgetHeight]})
                    }
                },
                {
                    form: EventConst.widgetHeight,
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: basic.widgetHeight.disabled,
                    input: { title: "高", min: basic.widgetHeight.min, max: basic.widgetHeight.max },
                    listener: {
                        key: EventConst.widgetSize,
                        getValue: da => da.height,
                        setValue: (height, data) => ({ height, width: data[EventConst.widgetWidth]})
                    },
                }
            ],
            { type: Form.Const.Type.Line }
        ];
    }

    set formData (data){
        this._formData = data;
    }

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
