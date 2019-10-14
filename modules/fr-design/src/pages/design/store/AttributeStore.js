/**
 * widget 属性
 * @flow
 * @author tangzehua
 * @sine 2019-09-29 11:11
 */
import React from 'react';
import {observable, action, computed} from 'mobx';
import type {MainStore, Rect, Size} from "../../../flow/Main.flow";
import {Form} from "fr-ui";
import {ItemConst} from "../components/item";
import {EventConst} from "../../../config/Attribute";
import {BaseStore} from "./BaseStore";

export class AttributeStore extends BaseStore {

    // form
    formRef = React.createRef();
    get form (){
        return this.formRef.current;
    }

    @observable
    formConfig = [];
    formData;

    /**
     * 初始化
     * @param {PageConfig} config 页面配置信息
     * @param {{data: PageData }} [options]
     */
    init(config, options = {}) {
        let that = this;
        that.formData = null;
        that.formConfig = that.createBasicConfig();
    }

    createBasicConfig (){
        let that = this;
        const { section } = that.main;
        const { canvasRect, gridAttribute } = section;
        const { config, pageData } = that.main;
        return [
            {
                className: "appearance-panel",
                config: [
                    [
                        {
                            form: "canvas.width",
                            type: Form.Const.Type.ConfirmInputNumber,
                            value: canvasRect.width,
                            disabled: true,
                            input: {
                                title: "宽",
                                min: config.designRect.width
                            },
                            listener: {
                                key: EventConst.canvasSize,
                                getValue: da => da.width,
                                setValue: da => ({width: da})
                            },
                        },
                        {
                            form: "canvas.height",
                            type: Form.Const.Type.ConfirmInputNumber,
                            value: canvasRect.height,
                            input: {
                                title: "高",
                                min: config.designRect.height
                            },
                            listener: {
                                key: EventConst.canvasSize,
                                getValue: da => da.height,
                                setValue: da => ({height: da})
                            },
                        }
                    ],
                    { type: Form.Const.Type.Line },
                    {
                        title: "背景颜色",
                        type: ItemConst.Type.Background,
                        form: "background",
                        value: pageData.backgroundColor,
                        listener: EventConst.background,
                        handlePicker: that.main.handleBackgroundColor
                    },
                    { type: Form.Const.Type.Line, top: 10 },
                    {
                        title: "网格",
                        type: ItemConst.Type.GridSetting,
                        form: "gridSize",
                        value: gridAttribute,
                        listener: EventConst.designGrid,
                        grid: { max: 100 }
                    },
                    { type: Form.Const.Type.Line, top: 10 }
                ]
            }
        ];
    }

    /**
     *
     * @param {Array} config
     * @param {Object} [formData]
     */
    @action
    setConfig = (config, formData) =>{
        let that = this;
        if ( !config || !config.length){
            that.formConfig = that.createBasicConfig();
            that.formData = null;
        } else {
            that.formConfig = config;
            that.formData = formData;
        }

    }
}
