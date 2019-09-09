/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:56
 */
import { observable, action, computed } from "mobx";
import type { MainStore } from "./MainStore.flow";
import { viewMinSize, scrollbarMinWidth, scrollbarThick, zoomScale } from "../config";
import React from "react";

export class SectionStore {

    sectionRef = React.createRef();
    // 视口大小, 需要计算
    @observable _viewportSize = { width: viewMinSize.width, height: viewMinSize.height };
    // content 缩放倍数
    @observable contentScale = 1;
    // content 尺寸
    @observable contentSize = { width: viewMinSize.width, height: viewMinSize.height };
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
        const { screenSize, viewportScale } = main.config;
        const vpWidth = screenSize.width * viewportScale.x;
        const vpHeight = screenSize.height * viewportScale.y;
        that.setViewportSize(vpWidth, vpHeight);

        that.rulerShadow = { x: 0, y: 0, width: screenSize.width, height: screenSize.height };
    }

    /**
     * 设置内容区尺寸
     * @param {number} width
     * @param {number} height
     */
    @action
    setContentSize(width: number, height: number) {
        this.contentSize = {
            width: Math.max(viewMinSize.width, width),
            height: Math.max(viewMinSize.height, height)
        };
        this.handleRulerPosition();
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
        const nextScale = Math.max(Math.min(zoomScale.max, scale), zoomScale.min);
        if (this.contentScale !== nextScale) {
            this.contentScale = nextScale;
            this.handleRulerPosition();
        }
    }

    /**
     * 视区滚轮事件
     * @param {WheelEvent} event
     */
    handleWheel = event => {
        let that = this;
        const { deltaY, deltaX } = event;
        if (event.ctrlKey || event.metaKey) {
            const nextScale = parseFloat(Math.max(0.2, that.contentScale - deltaY / 500).toFixed(2));
            that.setContentScale(nextScale);
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

        const { screenSize } = that.main.config;
        const {canvasRef} = that.main.screens;
        if( !canvasRef.current || !that.sectionRef.current) return;

        const canvasRect = canvasRef.current.getBoundingClientRect();
        const sectionRect = that.sectionRef.current.getBoundingClientRect();

        const rulerX =  -(canvasRect.left - scrollbarThick - sectionRect.left) / that.contentScale;
        const rulerY =  -(canvasRect.top - scrollbarThick - sectionRect.top) / that.contentScale;
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
}
