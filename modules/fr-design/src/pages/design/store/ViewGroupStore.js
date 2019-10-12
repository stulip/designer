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

export class ViewGroupStore {
    groupRef = React.createRef();

    get group() {
        return this.groupRef.current;
    }

    // 鼠标悬浮元素
    @observable hoveRect: ClientRect;
    // 选中元素
    @observable selectRect: ClientRect;
    // 选中的widget
    widgetItem: BaseWidget;

    main: MainStore;
    constructor(main: MainStore) {
        this.main = main;
    }

    @action
    handleWidgetMouseExit = (event: MouseEvent) => {
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
        that.selectRect = null;
        that.widgetItem = null;
        // 还原标尺刻度
        const { canvasRect } = that.main.section;
        that.main.section.setRulerShadow(0, 0, canvasRect.width, canvasRect.height);
    };

    /**
     * 设置选中widget
     * @param widget
     */
    setSelectWidget = (widget: BaseWidget) => {
        let that = this;
        that.widgetItem = widget;
    };

    /**
     * widget获得鼠标焦点
     * @param event
     */
    @action
    handleWidgetMouseEnter = (event: MouseEvent) => {
        let that = this;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = (rect.left - groupRect.left) / groupRect.width * 100;
        const top = ((rect.top - groupRect.top) / groupRect.height) * 100;
        const width = (rect.width / groupRect.width) * 100;
        const height = (rect.height / groupRect.height) * 100;

        //如果被点击了就不获得焦点rect
        const selectRect = that.selectRect;
        if (
            !selectRect ||
            left !== selectRect.left ||
            top !== selectRect.top ||
            width !== selectRect.width ||
            height !== selectRect.height
        ) {
            that.hoveRect = { left, top, width, height };
        } else {
            that.cancelHove();
        }
    };

    /**
     * widget 单击事件
     * @param {MouseEvent} event
     * @param {BaseWidget} widget
     */
    @action
    handleWidgetClick = (event: MouseEvent, widget: BaseWidget) => {
        let that = this;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = (rect.left - groupRect.left) / groupRect.width * 100;
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
    handleWidgetDBLClick = (event: MouseEvent, widget: BaseWidget)=> {

    }
}
