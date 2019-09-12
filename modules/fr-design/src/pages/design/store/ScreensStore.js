/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:44
 */
import {observable, action, computed} from 'mobx';
import type {MainStore} from "./MainStore.flow";
import React from "react";

export class ScreensStore {

    canvasRef:{current: Element} = React.createRef();

    // 页面配置信息
    @observable
    pageConfig = {
        // 背景颜色
        backgroundColor: '#fff',
        // 画布尺寸
        canvasSize: {width: 0, height: 0}
    };

    // 鼠标按下坐标
    @observable
    mouseDownPosition = null;

    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
        const { screenSize } = main.config;
        this.pageConfig.canvasSize = {...screenSize};
    }

    /**
     * 获取canvas的Rect属性
     * @returns {Element|ClientRect}
     */
    getCanvasBoundingRect (){
        return this.canvasRef.current && this.canvasRef.current.getBoundingClientRect();
    }

    /**
     * 背景颜色设置(事件)
     */
    handleBackgroundColor = ()=> {

    };

    @action
    handleMouseDown = (event: MouseEvent)=> {
        event.stopPropagation();
        event.preventDefault();
        this.mouseDownPosition = {x: event.pageX, y: event.pageY};
    };

    @action
    handleMouseUp = (event: MouseEvent)=> {
        this.mouseDownPosition = null;
    }
}
