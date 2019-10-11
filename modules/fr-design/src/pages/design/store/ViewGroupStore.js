/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-10-10 10:25
 */
import React from "react";
import { action, observable } from "mobx";
import type { MainStore } from "../../../flow/Main.flow";
import {BaseWidget} from "../../../widget/base/BaseWidget";

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
        this.selectRect = null;
        this.widgetItem = null;
    };

    /**
     * 设置选中widget
     * @param widget
     */
    setSelectWidget = (widget: BaseWidget)=> {
        let that = this;
        that.widgetItem = widget;
    };

    @action
    handleWidgetMouseEnter = (event: MouseEvent) => {
        let that = this;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = (rect.left - groupRect.left) / groupRect.width;
        const top = (rect.top - groupRect.top) / groupRect.height * 100;
        const width = rect.width / groupRect.width * 100;
        const height = rect.height / groupRect.height * 100;

        const selectRect = that.selectRect;
        if (
            !selectRect ||
            left !== selectRect.left ||
            top !== selectRect.top ||
            width !== selectRect.width ||
            height !== selectRect.height
        ) {
            that.hoveRect = { left, top, width, height};
        } else {
            that.cancelHove();
        }
    };

    @action
    handleWidgetSelect = (event: MouseEvent, widget: BaseWidget) => {
        let that = this;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = (rect.left - groupRect.left) / groupRect.width;
        const top = (rect.top - groupRect.top) / groupRect.height * 100;
        const width = rect.width / groupRect.width * 100;
        const height = rect.height / groupRect.height * 100;
        that.selectRect = { left, top, width, height };

        const hoveRect = that.hoveRect;
        if (
            hoveRect &&
            left === hoveRect.left &&
            top === hoveRect.top &&
            width === hoveRect.width &&
            height === hoveRect.height
        ) {
            that.cancelHove();
        }
        that.setSelectWidget(widget);
    };
}
