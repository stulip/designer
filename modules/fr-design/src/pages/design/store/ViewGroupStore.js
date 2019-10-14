/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-10-10 10:25
 */
import React from "react";
import { action, observable } from "mobx";
import type { MainStore } from "../../../flow/Main.flow";
import { BaseWidget } from "../../../widget/base/BaseWidget";
import {BaseStore} from "./BaseStore";
import {DesignEvent} from "fr-web";
import {EventConst} from "../../../config/Attribute";

export class ViewGroupStore extends BaseStore{
    groupRef = React.createRef();

    get group() {
        return this.groupRef.current;
    }

    // 鼠标悬浮元素
    @observable hoveRect: ClientRect;
    // 选中元素
    @observable selectRect: ClientRect;
    // 选中的widget
    widget: BaseWidget;

    addListener() {
        const that = this;
        DesignEvent.addListener(EventConst.widgetMouseClick, that.handleWidgetClick);
        DesignEvent.addListener(EventConst.widgetMouseExit, that.handleWidgetMouseExit);
        DesignEvent.addListener(EventConst.widgetMouseEnter, that.handleWidgetMouseEnter);
        DesignEvent.addListener(EventConst.widgetMouseDBLClick, that.handleWidgetDBLClick);
    }

    removeListener() {
        const that = this;
        DesignEvent.removeListener(EventConst.widgetMouseClick, that.handleWidgetClick);
        DesignEvent.removeListener(EventConst.widgetMouseExit, that.handleWidgetMouseExit);
        DesignEvent.removeListener(EventConst.widgetMouseEnter, that.handleWidgetMouseEnter);
        DesignEvent.removeListener(EventConst.widgetMouseDBLClick, that.handleWidgetDBLClick);
    }

    @action.bound
    handleWidgetMouseExit (event: MouseEvent){
        this.cancelHove();
    };

    @action
    cancelHove = () => {
        this.hoveRect = null;
    };

    // 取消选中元素
    @action
    cancelSelect = () => {
        let that = this;
        // 还原标尺刻度
        const { canvasRect } = that.main.section;
        that.main.section.setRulerShadow(0, 0, canvasRect.width, canvasRect.height);
        that.main.attribute.setConfig([]);

        if (that.main.attribute.form && that.widget){
            that.widget.formData = that.main.attribute.form.getFormData();
        }
        that.selectRect = null;
        that.widget = null;
    };

    /**
     * 设置选中widget
     * @param widget
     */
    @action
    setSelectWidget = (widget: BaseWidget) => {
        let that = this;
        if (that.widget && that.main.attribute.form){
            that.widget.formData = that.main.attribute.form.getFormData();
        }
        that.main.attribute.setConfig(widget.widgetProps(), widget.formData);
        that.widget = widget;
    };

    /**
     * widget获得鼠标焦点
     * @param event
     */
    @action.bound
    handleWidgetMouseEnter (event: MouseEvent) {
        let that = this;
        // 鼠标选择状态
        if (that.main.screens.rangeBoundRect || ! that.group) return;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = ((rect.left - groupRect.left) / groupRect.width) * 100;
        const top = ((rect.top - groupRect.top) / groupRect.height) * 100;
        const width = (rect.width / groupRect.width) * 100;
        const height = (rect.height / groupRect.height) * 100;

        //如果被点击了就不获得焦点rect
        const selectRect = that.selectRect;

        if (
            selectRect &&
            left === selectRect.left &&
            top === selectRect.top &&
            width === selectRect.width &&
            height === selectRect.height
        ) {
            that.cancelHove();
        } else {
            that.hoveRect = { left, top, width, height };
        }
    };

    /**
     * widget 单击事件
     * @param {MouseEvent} event
     * @param {BaseWidget} widget
     */
    @action.bound
    handleWidgetClick (event: MouseEvent, widget: BaseWidget) {
        let that = this;
        if ( !that.group ) return;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = ((rect.left - groupRect.left) / groupRect.width) * 100;
        const top = ((rect.top - groupRect.top) / groupRect.height) * 100;
        const width = (rect.width / groupRect.width) * 100;
        const height = (rect.height / groupRect.height) * 100;
        that.selectRect = { left, top, width, height };

        const hoveRect = that.hoveRect;
        const { canvasScale } = that.main.section;
        // 判断是否与焦点rect一样
        if (
            hoveRect &&
            left === hoveRect.left &&
            top === hoveRect.top &&
            width === hoveRect.width &&
            height === hoveRect.height
        ) {
            that.cancelHove();
        }
        // 设置标尺刻度
        that.main.section.setRulerShadow(
            (rect.left - groupRect.left) / canvasScale,
            (rect.top - groupRect.top) / canvasScale,
            rect.width / canvasScale,
            rect.height / canvasScale
        );
        that.setSelectWidget(widget);
    };

    /**
     * widget 双击事件
     * @param {MouseEvent} event
     * @param {BaseWidget} widget
     */
    @action.bound
    handleWidgetDBLClick (event: MouseEvent, widget: BaseWidget) {};
}
