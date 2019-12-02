/**
 * widget 属性
 * @flow
 * @author tangzehua
 * @sine 2019-09-29 11:11
 */
import React from 'react';
import {action, observable} from 'mobx';
import {Form} from "fr-ui";
import {ItemConst} from "../../../components";
import {ArrangeConst, PropsConst} from "../../../config/Attribute";
import {BaseStore} from "./BaseStore";
import {DesignEvent} from "fr-web";

export class AttributeStore extends BaseStore {

    // form
    formRef = React.createRef();

    get form() {
        return this.formRef.current;
    }

    @observable
    formConfig = [];
    @observable
    _baseConfig = [];
    formData;
    rootData = {};

    /**
     * 初始化
     * @param {PageConfig} config 页面配置信息
     * @param {{data: PageData }} [options]
     */
    init(config, options = {}) {
        let that = this;
        that.formData = null;
        that._baseConfig = [];
    }

    /**
     * root widget 初始化之后
     * @param {RootWidget} widget
     */
    rootInit = (widget) => {
        const that = this;
        that.rootData = widget.getFormData();
        that._baseConfig = [...widget.getWidgetProps(), ...that.createBasicConfig()];
        // 设置背景颜色
        const background = that.rootData[PropsConst.background];
        DesignEvent.emit(PropsConst.background, background);
        that.switchWidget(widget);
    };

    addListener() {
        const that = this;
        DesignEvent.addListener(PropsConst.switchWidget, that.switchWidget);
        DesignEvent.addListener(PropsConst.rootWidgetInit, that.rootInit);
        DesignEvent.addListener(PropsConst.switchWidgetState, that.switchWidgetState)
    }

    removeListener() {
        const that = this;
        DesignEvent.removeListener(PropsConst.switchWidget, that.switchWidget);
        DesignEvent.removeListener(PropsConst.rootWidgetInit, that.rootInit);
        DesignEvent.removeListener(PropsConst.switchWidgetState, that.switchWidgetState);
    }

    /**
     * 基础面板属性
     * @returns {{className: string, config: *[]}[]}
     */
    createBasicConfig() {
        let that = this;
        const {section} = that.main;
        const {canvasRect, gridAttribute} = section;
        const {config, pageData} = that.main;
        return [
            {
                className: "appearance-panel",
                config: [
                    {
                        title: "网格",
                        type: ItemConst.Type.GridSetting,
                        form: "gridSize",
                        value: gridAttribute,
                        listener: PropsConst.designGrid,
                        grid: { max: 100, min: 1 }
                    },
                    { type: Form.Const.Type.Line, top: 0 }
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
     * @param {Array} [config]
     * @param {Object} [formData]
     */
    @action
    _setConfig = (config, formData) => {
        let that = this;
        if (!config || !config.length) {
            that.formConfig = that._baseConfig;
            that.formData = that.rootData;
        } else {
            that.formConfig = config;
            that.formData = formData;
        }
    };

    /**
     * 监听widget 切换
     * @param {BaseWidget} widget
     */
    switchWidget = (widget) => {
        if (widget && widget.getId() !== this.main.pageId) {
            this._setConfig(widget.getWidgetProps(), widget.getFormData())
        } else {
            this._setConfig();
        }
    };

    /**
     * 监听widget 状态切换
     * @param {BaseWidget} widget
     * @param {string} stateId
     */
    switchWidgetState = (widget, stateId) => {
        this.switchWidget(widget);
    }
}
