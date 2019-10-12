/**
 * widget 属性
 * @flow
 * @author tangzehua
 * @sine 2019-09-29 11:11
 */
import React from 'react';
import {observable, action, computed} from 'mobx';
import type {MainStore, Rect, Size} from "../../../flow/Main.flow";

export class AttributeStore {

    // form
    formRef = React.createRef();
    get form (){
        return this.formRef.current;
    }

    @observable
    formConfig = [];
    formData = {};

    main: MainStore;
    constructor(main: MainStore) {
        let that = this;
        that.main = main;
    }

    handleCanvasSize  = (size: Size) => {
        this.main.section.setCanvasSize(size.width, size.height);
    };

    handleBackground = (color: string) => {
        this.main.setBackgroundColor(color);
    };

    @action
    setConfig (config, formData){
        this.formConfig = config;
        this.formData = formData;
    }
}
