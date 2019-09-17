/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:44
 */
import { observable, action, computed } from "mobx";
import type { MainStore } from "./MainStore.flow";
import React from "react";

export class ScreensStore {
    screensRef = React.createRef();
    canvasRef: { current: Element } = React.createRef();

    // 选框矩阵
    @observable
    rangeBoundRect = null;

    main: MainStore;
    constructor(main: MainStore) {
        this.main = main;
    }

    /**
     * 获取canvas的Rect属性
     * @returns {Element|ClientRect}
     */
    getCanvasBoundingRect() {
        return this.canvasRef.current && this.canvasRef.current.getBoundingClientRect();
    }

    /**
     * 背景颜色设置(事件)
     */
    handleBackgroundColor = () => {};

    @action
    handleMouseDown = (event: MouseEvent) => {
        if (event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();
        this.rangeBoundRect = {
            x: event.pageX,
            y: event.pageY,
            originX: event.pageX,
            originY: event.pageY,
            width: 0,
            height: 0,
        };
    };

    @action
    handleRangeBoundRect = (rect: Object) => {
        let that = this;
        that.rangeBoundRect = rect;
        rect && console.log(rect.x, rect.y, rect.width, rect.height, that.main.section.cont)
    };
}
