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
    // 视区大小, 需要计算
    @observable _viewportSize = { width: viewMinSize.width, height: viewMinSize.height };
    // content 缩放倍数
    @observable contentScale = zoomScale.normal;
    // 画布矩阵
    @observable canvasRect = {width: 0, height: 0, x: 0, y: 0, top: 0, left: 0};
    // content 尺寸
    @observable contentSize = { width: viewMinSize.width, height: viewMinSize.height };
    // 视口Rect 属性
    sectionRect = {};
    // scrollPosition bar 位置
    @observable scrollPosition = { x: 0.5, y: 0.5 };

    // 标尺坐标
    @observable rulerPosition = { x: 0, y: 0 };
    // 是否显示标尺
    @observable isShowRuler = true;
    // 是否显示标尺辅助线
    @observable isShowReferLine = true;
    // 标尺标注尺寸
    @observable rulerShadow = { x: 0, y: 0, width: viewMinSize.width, height: viewMinSize.height };

    main: MainStore;
    constructor(main: MainStore) {
        let that = this;
        that.main = main;
    }

    /**
     * 初始化
     * @param {Object} config 页面配置信息
     * @param {Object} [options]
     */
    init (config, options = {}){
        let that = this;
        const {screenSize} = config;
        that.setCanvasSize(screenSize.width, screenSize.height);
        that.setViewportSize(screenSize.width * viewportScale.x, screenSize.height * viewportScale.y);
        that.setRulerShadow(0, 0, screenSize.width, screenSize.height);

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
            that.canvasRect.top = contentRect.top - that.canvasRect.y;
            that.canvasRect.left = contentRect.left - that.canvasRect.x;
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
            const baseScale = that.contentScale - nextScale;

            const contentRect = that.main.screens.getCanvasBoundingRect();
            that.canvasRect.left = contentRect.left - that.canvasRect.x + ( that.canvasRect.width * baseScale) / 2;
            that.canvasRect.top = contentRect.top - that.canvasRect.y + ( that.canvasRect.height * baseScale) / 2;
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
            that.handleWheelScale(event);
        } else {
            // 滚轮调整画布坐标
            const canvasX = that.canvasRect.x - deltaX;
            const canvasY = that.canvasRect.y - deltaY;
            that.setCanvasPosition(canvasX, canvasY);
        }
    };

    /**
     * 滚轮缩放
     * @param {WheelEvent} event
     */
    handleWheelScale (event: WheelEvent){
        let that = this;
        const { deltaY, deltaX, pageX, pageY } = event;
        // 设置缩放
        const lastContentRect = {...that.canvasRect}, lastScale = that.contentScale;
        that.setContentScale(parseFloat((that.contentScale - deltaY / 500).toFixed(2)));
        const baseScale = lastScale - that.contentScale;

        const cutWidth = that.canvasRect.width * baseScale / 2;
        const cutHeight = that.canvasRect.height * baseScale / 2;
        if ( !cutWidth || !cutHeight) return;

        const screenX = pageX - (lastContentRect.left + that.canvasRect.x );
        const screenY = pageY - (lastContentRect.top + that.canvasRect.y);

        const width = that.canvasRect.width * lastScale / 2;
        const height = that.canvasRect.height * lastScale / 2;

        const contentX = that.canvasRect.x - cutWidth * (1 - screenX / width);
        const contentY = that.canvasRect.y - cutHeight* (1 - screenY / height);
        that.setCanvasPosition(contentX, contentY)
    }

    /**
     * 标尺原点点击事件
     */
    handleCornerClick = () => {
        this.setCanvasPosition(0, 0);
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
        this.scrollPosition.x = Math.max(Math.min(1, x || 0), 0);
        this.scrollPosition.y = Math.max(Math.min(1, y || 0), 0);
    }

    /**
     * 调整画布大小
     * @param width
     * @param height
     */
    setCanvasSize (width: number, height: number){
        let that = this;
        that.canvasRect.width = width;
        that.canvasRect.height = height;
    }

    /**
     * 设置画布坐标, 同时修改滚动条
     * @param {number} x
     * @param {number} y
     */
    @action
    setCanvasPosition(x: number, y: number) {
        let that = this;
        const { width, height } = that.viewportSize;
        const px = Math.min(Math.max(x || 0, -width), width);
        const py = Math.min(Math.max(y || 0, -height), height);

        if (px !== that.canvasRect.x || py !== that.canvasRect.y) {
            that.canvasRect.x = px;
            that.canvasRect.y = py;

            // 设置滚动条
            const scrollX = (width - px) / (width * 2);
            const scrollY = (height - py) / (height * 2);
            that.setScrollPosition(scrollX, scrollY);
            that.handleRulerPosition();
        }
    }

    /**
     * 计算标尺坐标
     * 现对于, 视区位置
     */
    handleRulerPosition() {
        let that = this;

        const canvasPosition = {
            y: that.canvasRect.y + that.canvasRect.top,
            x: that.canvasRect.x + that.canvasRect.left
        };
        const sectionRect = that.sectionRect;

        const rulerX = -(canvasPosition.x - scrollbarThick - sectionRect.left) / that.contentScale;
        const rulerY = -(canvasPosition.y - scrollbarThick - sectionRect.top) / that.contentScale;
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
     * 设置标尺, 选中刻度
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    setRulerShadow (x: number, y: number, width: number, height: number){
        this.rulerShadow = {x, y, width, height};
    }

    /**
     * 滚动条移动
     * @param {{x: number, y: number}} XY坐标 [0, 1]
     */
    handleScrollBarMove = ({ x, y }) => {
        let that = this;
        const { width, height } = that.viewportSize;
        if (!Types.isEmpty(x) && x !== that.scrollPosition.x) {
            that.setCanvasPosition(width * 2 * -x + width, that.canvasRect.y);
        } else if (!Types.isEmpty(y) && y !== that.scrollPosition.y) {
            that.setCanvasPosition(that.canvasRect.x, height * 2 * -y + height);
        }
    };
}
