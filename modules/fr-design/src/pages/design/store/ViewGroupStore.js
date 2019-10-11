/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-10-10 10:25
 */
import React from "react";
import { action, observable } from "mobx";
import type { MainStore } from "../../../flow/Main.flow";

export class ViewGroupStore {
    groupRef = React.createRef();

    get group() {
        return this.groupRef.current;
    }

    // 鼠标悬浮元素
    @observable
    hoveRect: ClientRect;

    // 选中元素
    @observable
    selectRect: ClientRect;

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
        // this.hoveRect = null;
    };

    // 取消选框
    @action
    cancelSelect = () => {
        this.selectRect = null;
    };

    @action
    handleWidgetMouseEnter = (event: MouseEvent) => {
        let that = this;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = (rect.left - groupRect.left) / groupRect.width;
        const top = (rect.top - groupRect.top) / groupRect.height * 100;

        const selectRect = that.selectRect;
        if (
            !selectRect ||
            left !== selectRect.left ||
            top !== selectRect.top ||
            rect.width !== selectRect.width ||
            rect.height !== selectRect.height
        ) {
            that.hoveRect = { left, top, width: rect.width / groupRect.width * 100, height: rect.height / groupRect.height * 100};
        }
    };

    @action
    handleWidgetSelect = (event: MouseEvent) => {
        let that = this;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = (rect.left - groupRect.left) / groupRect.width;
        const top = (rect.top - groupRect.top) / groupRect.height * 100;
        that.selectRect = { left, top, width: rect.width / groupRect.width * 100, height: rect.height / groupRect.height * 100 };

        const hoveRect = that.hoveRect;
        if (
            hoveRect &&
            left === hoveRect.left &&
            top === hoveRect.top &&
            rect.width === hoveRect.width &&
            rect.height === hoveRect.height
        ) {
            that.cancelHove();
        }
    };
}
