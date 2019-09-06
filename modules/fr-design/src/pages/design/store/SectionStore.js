/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:56
 */
import { observable, action, computed } from "mobx";
import type { MainStore } from "./MainStore.flow";
import { viewMinSize } from "../config.js";

export class SectionStore {
    // 视口大小, 需要计算
    @observable viewportSize = { width: viewMinSize.width, height: viewMinSize.height };
    // content 缩放倍数
    @observable contentScale = 1;
    // content 尺寸
    @observable contentSize = { width: viewMinSize.width, height: viewMinSize.height };
    // 视口坐标
    @observable contentPosition = { x: 0, y: 0 };
    // scroll bar 位置
    @observable scroll = { x: 0.5, y: 0.5 };
    // 是否显示标尺
    @observable isShowRuler = true;
    // 是否显示标尺辅助线
    @observable isShowReferLine = true;

    main: MainStore;
    constructor(main: MainStore) {
        let that = this;
        const { screenSize } = main.config;
        that.main = main;

        const vpWidth = screenSize.width * 10;
        const vpHeight = screenSize.height * 4;
        that.setViewportSize(vpWidth, vpHeight);
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
    }

    /**
     * 设置视口尺寸
     * @param {number} width
     * @param {number} height
     */
    @action
    setViewportSize(width: number, height: number) {
        this.viewportSize = {
            width: Math.max(viewMinSize.width, width),
            height: Math.max(viewMinSize.height, height)
        };
    }

    /**
     * 视区滚轮事件
     * @param {WheelEvent} event
     */
    handleWheel = event => {
        let that = this;
        const { deltaY, deltaX } = event;
        const contentY = that.contentPosition.y - deltaY;
        const contentX = that.contentPosition.x - deltaX;
        that.setContentPosition(contentX, contentY);
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
     * @param x
     * @param y
     */
    @action
    setContentPosition(x: number, y: number) {
        let that = this;
        const { width, height } = that.viewportSize;
        const px = Math.min(Math.max(x || 0, -width), width);
        const py = Math.min(Math.max(y || 0, -height), height);
        that.contentPosition.x = px;
        that.contentPosition.y = py;

        const scrollX = (width - px) / (width * 2);
        const scrollY = (height - py) / (height * 2);
        that.setScrollPosition(scrollX, scrollY);
    }
}
