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
import {PropsConst, ArrangeConst} from "../../../config/Attribute";
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

    /**
     * 基础面板属性
     * @returns {{className: string, config: *[]}[]}
     */
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
                                key: PropsConst.canvasSize,
                                getValue: da => da.width,
                                setValue: (width, data) => ({ width, height: data['canvas.height']})
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
                                key: PropsConst.canvasSize,
                                getValue: da => da.height,
                                setValue: (height, data) => ({ height, width: data['canvas.width']})
                            },
                        }
                    ],
                    { type: Form.Const.Type.Line },
                    {
                        title: "背景颜色",
                        type: ItemConst.Type.Background,
                        form: "background",
                        value: pageData.backgroundColor,
                        listener: PropsConst.background,
                        handlePicker: that.main.handleBackgroundColor
                    },
                    { type: Form.Const.Type.Line, top: 10 },
                    {
                        title: "网格",
                        type: ItemConst.Type.GridSetting,
                        form: "gridSize",
                        value: gridAttribute,
                        listener: PropsConst.designGrid,
                        grid: { max: 100, min: 1 }
                    },
                    { type: Form.Const.Type.Line, top: 10 }
                ]
            }
        ];
    }

    /**
     * 表单数据被改变
     * @param formData
     */
    onFormChange = (formData: Object)=> {
        let that = this;
        that.main.viewGroup.handleWidgetChange(formData);
    };

    onArrangeClick = (event: MouseEvent)=> {
        const type = event.currentTarget.getAttribute('data-type');
        switch (type) {
            case ArrangeConst.alignTop:
                break;
            case ArrangeConst.alignRight:
                break;
            case ArrangeConst.alignBottom:
                break;
            case ArrangeConst.alignLeft:
                break;
            case ArrangeConst.alignCenterV:
                break;
            case ArrangeConst.alignCenterH:
                break;
            default:
                break;
        }
    };

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
