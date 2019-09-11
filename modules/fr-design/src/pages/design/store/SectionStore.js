/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:56
 */
import { observable, action, computed } from "mobx";
import type { MainStore } from "./MainStore.flow";
import { viewMinSize, scrollbarMinWidth, scrollbarThick, zoomScale, viewportScale } from "../config";
import React from "react";
import { Types } from "@xt-web/core";

export class SectionStore {
    sectionRef = React.createRef();
    wheelRef = React.createRef();

    // 视口大小, 需要计算
    @observable _viewportSize = { width: viewMinSize.width, height: viewMinSize.height };
    // content 缩放倍数
    @observable contentScale = zoomScale.normal;
    // content 尺寸
    @observable contentSize = { width: viewMinSize.width, height: viewMinSize.height };
    // 内容Rect 属性
    contentRect = {};
    // 视口Rect 属性
    sectionRect = {};
    // 视口坐标
    @observable contentPosition = { x: 0, y: 0 };
    // scroll bar 位置
    @observable scroll = { x: 0.5, y: 0.5 };

    // 标尺坐标
    @observable rulerPosition = { x: 0, y: 0 };
    // 是否显示标尺
    @observable isShowRuler = true;
    // 是否显示标尺辅助线
    @observable isShowReferLine = true;
    // 标尺标注尺寸
    rulerShadow = { x: 0, y: 0, width: viewMinSize.width, height: viewMinSize.height };

    main: MainStore;
    constructor(main: MainStore) {
        let that = this;
        that.main = main;
        const { canvasSize } = main.screens.pageConfig;
        const vpWidth = canvasSize.width * viewportScale.x;
        const vpHeight = canvasSize.height * viewportScale.y;
        that.setViewportSize(vpWidth, vpHeight);

        that.rulerShadow = { x: 0, y: 0, width: canvasSize.width, height: canvasSize.height };
    }

    /**
     * 设置内容区尺寸
     * @param {number} width
     * @param {number} height
     */
    @action
    setContentSize(width: number, height: number) {
        let that = this;
        that.contentSize = {
            width: Math.max(viewMinSize.width, width),
            height: Math.max(viewMinSize.height, height)
        };

        const contentRect = that.main.screens.getCanvasBoundingRect();
        if (contentRect) {
            that.contentRect = {
                top: contentRect.top - that.contentPosition.y,
                left: contentRect.left - that.contentPosition.x
            };
            that.sectionRect = that.sectionRef.current.getBoundingClientRect();
        }
        that.handleRulerPosition();
    }

    /**
     * 设置视口尺寸
     * @param {number} width
     * @param {number} height
     */
    @action
    setViewportSize(width: number, height: number) {
        this._viewportSize = {
            width: Math.max(viewMinSize.width, width),
            height: Math.max(viewMinSize.height, height)
        };
    }

    /**
     * 设置视图缩放比例
     * @param scale
     */
    @action
    setContentScale(scale: number) {
        let that = this;
        const nextScale = Math.max(
            Math.min(zoomScale.interval[zoomScale.interval.length - 1], scale),
            zoomScale.interval[0]
        );

        if (that.contentScale !== nextScale) {
            const {canvasSize} = that.main.screens.pageConfig;
            const baseScale = that.contentScale - nextScale;

            const contentRect = that.main.screens.getCanvasBoundingRect();
            that.contentRect = {
                top: contentRect.top - that.contentPosition.y + ( canvasSize.height * baseScale) / 2,
                left: contentRect.left - that.contentPosition.x + ( canvasSize.width * baseScale) / 2
            };
            that.contentScale = nextScale;
            that.handleRulerPosition();
        }
    }

    /**
     * 视区滚轮事件
     * @param {WheelEvent} event
     */
    handleWheel = (event: WheelEvent) => {
        let that = this;
        event.preventDefault();
        event.stopPropagation();
        const { deltaY, deltaX, pageX, pageY } = event;
        if (event.ctrlKey || event.metaKey) {
            const {canvasSize} = that.main.screens.pageConfig;
            // 设置缩放
            const lastScale = that.contentScale;
            that.setContentScale(parseFloat((that.contentScale - deltaY / 500).toFixed(2)));
            const baseScale = lastScale - that.contentScale;


            const pxx = pageX - that.contentRect.left;
            const pyy = pageY - that.contentRect.top;
            const px = that.contentPosition.x - canvasSize.width * baseScale / 2 + pxx * baseScale / 2;
            const py = that.contentPosition.y - canvasSize.height * baseScale / 2 + pyy * baseScale / 2;

            // const px = that.contentRect.left + canvasSize.width / 2 - pageX;
            // const py = that.contentRect.top + canvasSize.height / 2 - pageY;

            // console.log( canvasSize.width * baseScale, pxx / 2 * baseScale);
            that.setContentPosition(px, py)
        } else {
            const contentY = that.contentPosition.y - deltaY;
            const contentX = that.contentPosition.x - deltaX;
            that.setContentPosition(contentX, contentY);
        }
    };

    /**
     * 标尺原点点击事件
     */
    handleCornerClick = () => {
        this.setContentPosition(0, 0);
    };

    /**
     * 标尺显示/隐藏,事件
     */
    @action
    handleShowRuler = () => {
        this.isShowRuler = !this.isShowRuler;
    };

    /**
     * 辅助线显示/隐藏, 事件
     */
    @action
    handleShowReferLine = () => {
        this.handleShowReferLine = !this.handleShowReferLine;
    };

    /**
     * 设置滚动条坐标
     * @param {number} x
     * @param {number} y
     */
    @action
    setScrollPosition(x: number, y: number) {
        this.scroll.x = Math.max(Math.min(1, x || 0), 0);
        this.scroll.y = Math.max(Math.min(1, y || 0), 0);
    }

    /**
     * 设置视图坐标, 同时修改滚动条
     * @param {number} x
     * @param {number} y
     */
    @action
    setContentPosition(x: number, y: number) {
        let that = this;
        const { width, height } = that.viewportSize;
        const px = Math.min(Math.max(x || 0, -width), width);
        const py = Math.min(Math.max(y || 0, -height), height);

        if (px !== that.contentPosition.x || py !== that.contentPosition.y) {
            that.contentPosition.x = px;
            that.contentPosition.y = py;

            // 设置滚动条
            const scrollX = (width - px) / (width * 2);
            const scrollY = (height - py) / (height * 2);
            that.setScrollPosition(scrollX, scrollY);
            that.handleRulerPosition();
        }
    }

    /**
     * 计算标尺坐标
     */
    handleRulerPosition() {
        let that = this;

        const canvasRect = {
            top: that.contentPosition.y + that.contentRect.top,
            left: that.contentPosition.x + that.contentRect.left
        };
        const sectionRect = that.sectionRect;

        const rulerX = -(canvasRect.left - scrollbarThick - sectionRect.left) / that.contentScale;
        const rulerY = -(canvasRect.top - scrollbarThick - sectionRect.top) / that.contentScale;
        that.setRulerPosition(rulerX, rulerY);
    }

    /**
     * 视口尺寸, 不小于内容区域
     * @returns {{width: *, height: *}}
     */
    @computed
    get viewportSize() {
        return {
            width: Math.max(this.contentSize.width, this._viewportSize.width),
            height: Math.max(this.contentSize.height, this._viewportSize.height)
        };
    }

    /**
     * 滚动视区尺寸
     * @returns {{width: number, height: number}}
     */
    @computed
    get scrollSize() {
        return { width: this.viewportSize.width * 2, height: this.viewportSize.height * 2 };
    }

    /**
     * 滚动条, 尺寸
     * @returns {{width: *, height: *}}
     */
    @computed
    get scrollBarSize() {
        let that = this;
        const width = Math.max(scrollbarMinWidth, 100 / (that.scrollSize.width / that.contentSize.width));
        const height = Math.max(scrollbarMinWidth, 100 / (that.scrollSize.height / that.contentSize.height));
        return { width, height, vecX: 100 - width, vecY: 100 - height };
    }

    /**
     * 标尺尺寸
     * @returns {{width: number, height: number}}
     */
    @computed
    get rulerSize() {
        return {
            width: this.contentSize.width - scrollbarThick - 1,
            height: this.contentSize.height - scrollbarThick - 1
        };
    }

    /**
     * 设置标尺坐标
     * @param {number} x
     * @param {number} y
     */
    @action
    setRulerPosition(x: number, y: number) {
        this.rulerPosition = { x, y };
    }

    /**
     * 滚动条移动
     * @param {{x: number, y: number}} XY坐标 [0, 1]
     */
    handleScrollBarMove = ({ x, y }) => {
        let that = this;
        const { width, height } = that.viewportSize;
        if (!Types.isEmpty(x) && x !== that.scroll.x) {
            that.setContentPosition(width * 2 * -x + width, that.contentPosition.y);
        } else if (!Types.isEmpty(y) && y !== that.scroll.y) {
            that.setContentPosition(that.contentPosition.x, height * 2 * -y + height);
        }
    };
}
