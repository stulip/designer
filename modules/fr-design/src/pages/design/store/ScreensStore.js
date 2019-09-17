/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:44
 */
import { observable, action, computed } from "mobx";
import type {MainStore, Rect} from "./MainStore.flow";
import React from "react";

export class ScreensStore {
    screensRef = React.createRef();
    canvasRef: { current: Element } = React.createRef();

    // 选框矩阵
    @observable
    rangeBoundRect:Rect = null;

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

    /**
     * 设置鼠标选框boundRect
     * @param {{x: number, y: number, width: number, height: number, originX: number, originY: number}} rect
     */
    @action
    handleRangeBoundRect = (rect) => {
        let that = this;
        if ( rect ){
            const lastRect = that.rangeBoundRect;
            // 根据需要调整滚动条位置
            const section = that.main.section;
            const {contentRect} = section;

            let offsetX = 0, offsetY = 0;
            if (rect.x < contentRect.left){
                // 左边
                offsetX = -Math.abs(lastRect.x - rect.x);
                rect.width -= offsetX;
                rect.originX -= offsetX;
            } else if (rect.x + rect.width > contentRect.left + contentRect.width){
                // 右边
                offsetX = Math.abs((rect.x + rect.width) - (lastRect.x + lastRect.width));
                rect.originX -= offsetX;
            }

            if (contentRect.top > rect.y){
                // 上边
                offsetY = -Math.abs(rect.y - lastRect.y);
                rect.height -= offsetY;
                rect.originY -= offsetY;
            } else if (rect.y + rect.height > contentRect.top + contentRect.height) {
                // 下边
                offsetY = Math.abs((lastRect.y + lastRect.height) - (rect.y + rect.height))
                rect.originY -= offsetY;
            }
            section.offsetCanvasPosition(offsetX, offsetY);
        }

        that.rangeBoundRect = rect;
    };
}
