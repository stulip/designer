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
import type {DesignType, Rect} from "../../flow/Main.flow";
import {Types} from "@xt-web/core";

export type BaseWidgetProps = {
    canvasRect: Rect,
    designRect: DesignType
};
type State = {};

export class BaseWidget extends React.Component<BaseWidgetProps, State> {
    // 所有属性
    formData: Object;
    widgetRef = React.createRef();
    get widget() {
        return this.widgetRef.current;
    }

    get group (){
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
    formatValue (value){
        return Types.isObject(value)? value: {value};
    }

    /**
     * 初始化widget表单数据
     */
    initWidgetFormData() {
        let  that = this;
        const { value } = that.props;
        that.formData = {
            ...that.formatValue(value)
        };
    }

    // 初始化 widget 基础属性
    initWidgetBasicData (){
        let that = this;
        if (!that.widget || !that.group || !Types.isUndefined(that.formData['widget.name'])) return;
        const widgetRect = that.widget.getBoundingClientRect();
        const groupRect = that.group.getBoundingClientRect();

        that.formData = {
            ...that.formData,
            "widget.name": that.getName(),
            "widget.width": widgetRect.width,
            "widget.height": widgetRect.height,
            "widget.x": widgetRect.x - groupRect.x,
            "widget.y": widgetRect.y - groupRect.y,
        };
    }

    addListener() {
        let that = this;
        if (!that.widget) return;
        that.widget.addEventListener("mouseleave", that.handleMouseLeave);
        that.widget.addEventListener("mousedown", that.handleMouseDown);
        that.widget.addEventListener("mouseover", that.handleMouseEnter);
        that.widget.addEventListener("click", that.handleClick);
        that.widget.addEventListener("dblclick", that.handleDBLClick);
    }

    removeListener() {
        if (!that.widget) return;
        that.widget.removeEventListener("mouseleave", that.handleMouseLeave);
        that.widget.removeEventListener("mousedown", that.handleMouseDown);
        that.widget.removeEventListener("mouseover", that.handleMouseEnter);
        that.widget.removeEventListener("click", that.handleClick);
        that.widget.removeEventListener("dblclick", that.handleDBLClick);
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
     * 是否禁用宽度改变
     * @returns {boolean}
     */
    isDisableWidth (){
        return false;
    }

    /**
     * 是否禁用高度改变
     * @returns {boolean}
     */
    isDisableHeight(){
        return false;
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
                    input: { title: "X ", min: 0 }
                },
                {
                    form: "widget.y",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: true,
                    input: { title: "Y ", min: 0 }
                }
            ],
            [
                {
                    form: "widget.width",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: that.isDisableWidth(),
                    input: { title: "宽", min: 0 }
                },
                {
                    form: "widget.height",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: that.isDisableHeight(),
                    input: { title: "高", min: 0 }
                }
            ],
            {type: Form.Const.Type.Line}
        ];
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
