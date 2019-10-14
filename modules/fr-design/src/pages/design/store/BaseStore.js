/**
 * 基类Store
 * @flow
 * @author tangzehua
 * @sine 2019-10-14 09:25
 */
import {observable, action, computed} from 'mobx';
import type {MainStore} from "../../../flow/Main.flow";

export class BaseStore {

    main: MainStore;
    constructor(main: MainStore) {
        let that = this;
        that.main = main;
        that.main.pushStore(that);
    }

    classMount (){
        let that = this;
        that.addListener();
        that.addKeyListener();
    }

    // didMount 挂在后
    mount (){

    }

    // 元素被卸载
    unmount (){
        let that = this;
        that.removeListener();
        that.removeKeyListener();
    }

    /**
     * 初始化
     * @param {PageConfig} config 页面配置信息
     * @param {{data: PageData }} [options]
     */
    init (config, options = {}){
        // 子类实现
        const that = this;
    }

    addListener (){
        // 子类实现
    }

    removeListener (){
        // 子类实现
    }

    addKeyListener (){
        // 子类实现
    }

    removeKeyListener (){
        //子类实现
    }
}
