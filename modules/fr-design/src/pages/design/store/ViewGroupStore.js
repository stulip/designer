/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-10-10 10:25
 */
import React from 'react';
import { observable, action, computed } from "mobx";
import type { MainStore } from "../../../flow/Main.flow";

export class ViewGroupStore {

    groupRef = React.createRef();

    get group (){
        return this.groupRef.current;
    }

    // 鼠标悬浮元素
    @observable
    hoveRect: ClientRect;

    // 选中元素
    @observable
    selectRect: ClientRect;

    main: MainStore;
    constructor(main: MainStore) {
        this.main = main;
    }

    @action
    handleWidgetMouseExit = (event: MouseEvent)=> {
        this.hoveRect = null;
    };

    @action
    handleWidgetMouseEnter = (event: MouseEvent)=> {
        const groupRect = this.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        this.hoveRect = {
            left: rect.left - groupRect.left,
            top: rect.top - groupRect.top,
            width: rect.width,
            height: rect.height
        };
    }
}
