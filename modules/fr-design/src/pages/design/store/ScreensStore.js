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
    };

    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
    }

    /**
     * 背景颜色设置(事件)
     */
    handleBackgroundColor = ()=> {

    }
}
