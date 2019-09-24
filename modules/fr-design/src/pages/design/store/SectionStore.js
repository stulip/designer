/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:56
 */
import { observable, action, computed } from "mobx";
import type { MainStore, Rect } from "../../../flow/Main.flow";
import {viewMinSize, scrollbarMinWidth, scrollbarThick, zoomScale, viewportScale, LocalData, ENUM} from "../../../config";
import React from "react";
import { Types } from "@xt-web/core";

export class SectionStore {
    sectionRef = React.createRef();
    // 视区大小, 需要计算
    @observable _viewportSize = { width: viewMinSize.width, height: viewMinSize.height };
    // content 缩放倍数
    @observable canvasScale = zoomScale.normal;
    // 画布矩阵
    @observable canvasRect: Rect = { width: 0, height: 0, x: 0, y: 0, top: 0, left: 0 };
    // 视口 content 矩阵
    @observable contentRect: Rect = { width: viewMinSize.width, height: viewMinSize.height, top: 0, left: 0 };
    // scrollPosition bar 位置
    @observable scrollPosition = { x: 0.5, y: 0.5 };

    // 标尺坐标
    @observable rulerPosition = { x: 0, y: 0 };
    // 是否显示标尺
    @observable isShowRuler = true;
    // 是否显示标尺辅助线
    @observable isShowReferLine = true;
    // 标尺标注尺寸
    @observable rulerShadow: Rect = { x: 0, y: 0, width: viewMinSize.width, height: viewMinSize.height };

    main: MainStore;
    constructor(main: MainStore) {
        let that = this;
        that.main = main;
        that.addKeyListener();
    }

    addKeyListener (){

    }

    /**
     * 初始化
     * @param {PageConfig} config 页面配置信息
     * @param {{data: PageData }} [options]
     */
    init(config, options = {}) {
        let that = this;
        const { canvasSize } = config;
        const {data} = options;

        // 取出保存在本地的 缩放大小
        that.canvasScale = LocalData.getFloatItem(`${ENUM.DESIGN_SCALE}_${data.id}`, that.canvasScale);
        that.setCanvasSize(canvasSize.width, canvasSize.height);
        that.setViewportSize(canvasSize.width * viewportScale.x, canvasSize.height * viewportScale.y);
    }

    /**
     * 设置内容区尺寸
     * @param {number} width
     * @param {number} height
     */
    @action
    setContentSize(width: number, height: number) {
        let that = this;
        that.contentRect.width = Math.max(viewMinSize.width, width);
        that.contentRect.height = Math.max(viewMinSize.height, height);

        // 计算画布边距
        const canvasRect = that.main.screens.getCanvasBoundingRect();
        that.canvasRect.top = canvasRect.top - that.canvasRect.y;
        that.canvasRect.left = canvasRect.left - that.canvasRect.x;

        // 计算视口边距
        const contentRect = that.sectionRef.current.getBoundingClientRect();
        that.contentRect.left = contentRect.left;
        that.contentRect.top = contentRect.top;

        that.handleRulerPosition();
    }

    /**
     * 设置视区尺寸
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

        if (that.canvasScale !== nextScale) {
            const lastScale = that.canvasScale;
            const baseScale = lastScale - nextScale;

            // 重新计算 画布边距
            const canvasRect = that.main.screens.getCanvasBoundingRect();
            that.canvasRect.left = canvasRect.left - that.canvasRect.x + (that.canvasRect.width * baseScale) / 2;
            that.canvasRect.top = canvasRect.top - that.canvasRect.y + (that.canvasRect.height * baseScale) / 2;

            // 重新计算视区大小
            const vpWidth = (that.viewportSize.width / lastScale) * nextScale;
            const vpHeight = (that.viewportSize.height / lastScale) * nextScale;
            that.setViewportSize(vpWidth, vpHeight);

            that.canvasScale = nextScale;
            that.handleRulerPosition();

            LocalData.setItem(`${ENUM.DESIGN_SCALE}_${that.main.pageData.id}`, that.canvasScale);
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
            that.adjustCanvasPosition(deltaX, deltaY);
        }
    };

    /**
     * 滚轮缩放
     * @param {WheelEvent} event
     */
    handleWheelScale(event: WheelEvent) {
        let that = this;
        const { deltaY, deltaX, pageX, pageY } = event;
        // 设置缩放
        const lastContentRect = { ...that.canvasRect },
            lastScale = that.canvasScale;
        that.setContentScale(parseFloat((that.canvasScale - deltaY / 500).toFixed(2)));
        const baseScale = lastScale - that.canvasScale;

        const cutWidth = (that.canvasRect.width * baseScale) / 2;
        const cutHeight = (that.canvasRect.height * baseScale) / 2;
        if (!cutWidth || !cutHeight) return;

        const screenX = pageX - (lastContentRect.left + that.canvasRect.x);
        const screenY = pageY - (lastContentRect.top + that.canvasRect.y);

        const width = (that.canvasRect.width * lastScale) / 2;
        const height = (that.canvasRect.height * lastScale) / 2;

        const contentX = that.canvasRect.x - cutWidth * (1 - screenX / width);
        const contentY = that.canvasRect.y - cutHeight * (1 - screenY / height);
        that.setCanvasPosition(contentX, contentY);
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
    @action
    setCanvasSize(width: number, height: number) {
        let that = this;
        const { designRect } = that.main.config;
        const nextWidth = Math.max(width, designRect.width);
        const nextHeight = Math.max(height, designRect.height);

        const lastWidth = that.canvasRect.width;
        const lastHeight = that.canvasRect.height;
        if (nextWidth !== lastWidth || nextHeight !== lastHeight) {
            that.canvasRect.width = nextWidth;
            that.canvasRect.height = nextHeight;

            that.setRulerShadow(0, 0, nextWidth, nextHeight);
            that.handleRulerPosition();
        }
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
     * 偏移坐标
     * @param {number} deltaX 偏移X 坐标量
     * @param {number} deltaY 偏移Y 坐标量
     */
    adjustCanvasPosition(deltaX: number, deltaY: number) {
        let that = this;
        const canvasX = that.canvasRect.x - deltaX;
        const canvasY = that.canvasRect.y - deltaY;
        that.setCanvasPosition(canvasX, canvasY);
    }

    /**
     * 增量画布大小
     * @param {number} deltaWidth 增量宽度
     * @param {number} deltaHeight 增量高度
     */
    adjustCanvasSize(deltaWidth: number, deltaHeight: number) {
        let that = this;
        const width = deltaWidth + that.canvasRect.width;
        const height = deltaHeight + that.canvasRect.height;
        that.setCanvasSize(width, height);
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

        const rulerX = -(canvasPosition.x - scrollbarThick - that.contentRect.left) / that.canvasScale;
        const rulerY = -(canvasPosition.y - scrollbarThick - that.contentRect.top) / that.canvasScale;
        that.setRulerPosition(rulerX, rulerY);
    }

    /**
     * 视口尺寸, 不小于内容区域
     * @returns {{width: *, height: *}}
     */
    @computed
    get viewportSize() {
        let that = this;
        return {
            width: Math.max(that.contentRect.width, that._viewportSize.width),
            height: Math.max(that.contentRect.height, that._viewportSize.height)
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
        const width = Math.max(scrollbarMinWidth, 100 / (that.scrollSize.width / that.contentRect.width));
        const height = Math.max(scrollbarMinWidth, 100 / (that.scrollSize.height / that.contentRect.height));
        return { width, height, vecX: 100 - width, vecY: 100 - height };
    }

    /**
     * 标尺尺寸
     * @returns {{width: number, height: number}}
     */
    @computed
    get rulerSize() {
        return {
            width: this.contentRect.width - scrollbarThick - 1,
            height: this.contentRect.height - scrollbarThick - 1
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
    setRulerShadow(x: number, y: number, width: number, height: number) {
        this.rulerShadow = { x, y, width, height };
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
