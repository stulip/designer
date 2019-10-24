/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-10-10 10:25
 */
import React from "react";
import {action, observable} from "mobx";
import {BaseWidget} from "../../../widget/base/BaseWidget";
import {BaseStore} from "./BaseStore";
import {DesignEvent} from "fr-web";
import {PropsConst} from "../../../config/Attribute";

export class ViewGroupStore extends BaseStore {

    // 组件布局
    _groupConfig = [];
    groupRef = React.createRef();

    get group() {
        return this.groupRef.current;
    }

    // 鼠标悬浮元素
    @observable hoveRect: ClientRect;
    // 选中元素
    @observable selectRect: ClientRect;
    // 选中的widget
    widget: BaseWidget;
    parentWidget: BaseWidget;

    addListener() {
        const that = this;
        // mouse
        DesignEvent.addListener(PropsConst.widgetMouseClick, that.handleWidgetClick);
        DesignEvent.addListener(PropsConst.widgetMouseExit, that.handleWidgetMouseExit);
        DesignEvent.addListener(PropsConst.widgetMouseEnter, that.handleWidgetMouseEnter);
        DesignEvent.addListener(PropsConst.widgetMouseDBLClick, that.handleWidgetDBLClick);

        //widget basic
    }

    removeListener() {
        const that = this;
        // mouse
        DesignEvent.removeListener(PropsConst.widgetMouseClick, that.handleWidgetClick);
        DesignEvent.removeListener(PropsConst.widgetMouseExit, that.handleWidgetMouseExit);
        DesignEvent.removeListener(PropsConst.widgetMouseEnter, that.handleWidgetMouseEnter);
        DesignEvent.removeListener(PropsConst.widgetMouseDBLClick, that.handleWidgetDBLClick);

        //widget basic
    }

    @action.bound
    handleWidgetMouseExit(event: MouseEvent) {
        this.cancelHove();
    }

    @action
    cancelHove = () => {
        this.hoveRect = null;
    };

    // 取消选中元素
    @action
    cancelSelect = () => {
        let that = this;
        // 还原标尺刻度
        const { canvasRect } = that.main.section;
        that.main.section.setRulerShadow(0, 0, canvasRect.width, canvasRect.height);
        that.main.attribute.setConfig();
        that.widget && (that.widget.onUpdate = null);

        that.selectRect = null;
        that.widget = null;
        that.parentWidget = null;
    };

    /**
     * 设置选中widget
     * @param {BaseWidget} [widget]
     */
    @action
    setSelectWidget = (widget ?: BaseWidget) => {
        let that = this;
        widget.onUpdate = that._reWidgetSelectBox;
        that.main.attribute.setConfig(widget.widgetProps(), widget.formData);
        that.widget = widget;
    };

    /**
     * widget props change
     * @param formData
     */
    handleWidgetChange = (formData: Object) => {
        let that = this;
        if (that.widget) {
            that.widget.handleChange(formData);
        }
    };

    /**
     * 修改选框
     * @private
     */
    _reWidgetSelectBox = () => {
        let that = this;
        if (!that.widget) return;
        const rect = that.widget.widget.getBoundingClientRect();
        that._handleWidgetSelect(rect);
    };

    /**
     * widget获得鼠标焦点
     * @param event
     */
    @action.bound
    handleWidgetMouseEnter(event: MouseEvent) {
        let that = this;
        // 鼠标选择状态
        if (that.main.screens.rangeBoundRect || !that.group) return;
        const groupRect = that.group.getBoundingClientRect();
        const rect = event.currentTarget.getBoundingClientRect();
        const left = ((rect.left - groupRect.left) / groupRect.width) * 100;
        const top = ((rect.top - groupRect.top) / groupRect.height) * 100;
        const width = (rect.width / groupRect.width) * 100;
        const height = (rect.height / groupRect.height) * 100;

        //如果被点击了就不获得焦点rect
        const selectRect = that.selectRect;

        if (
            selectRect &&
            left === selectRect.left &&
            top === selectRect.top &&
            width === selectRect.width &&
            height === selectRect.height
        ) {
            that.cancelHove();
        } else {
            that.hoveRect = { left, top, width, height };
        }
    }

    /**
     * widget 单击事件
     * @param {MouseEvent} event
     * @param {BaseWidget} widget
     */
    @action.bound
    handleWidgetClick(event: MouseEvent, widget: BaseWidget) {
        let that = this;
        if (!that.group || widget === that.parentWidget) return;
        that.parentWidget = widget;
        const rect = event.currentTarget.getBoundingClientRect();
        const margin = {};
        ({
            marginTop: margin.top,
            marginBottom: margin.bottom,
            marginLeft: margin.left,
            marginRight: margin.right
        } = event.currentTarget.style);
        // 设置选框
        that._handleWidgetSelect({
            width: rect.width + parseInt(margin.left || 0) + parseInt(margin.right || 0),
            height: rect.height + parseInt(margin.top || 0) + parseInt(margin.bottom || 0),
            left: rect.left - parseInt(margin.left || 0),
            top: rect.top - parseInt(margin.top || 0),
        });
        that.setSelectWidget(widget);
    }

    @action
    _handleWidgetSelect(rect) {
        let that = this;
        if (!that.group) return;

        const groupRect = that.group.getBoundingClientRect();
        const left = ((rect.left - groupRect.left) / groupRect.width) * 100;
        const top = ((rect.top - groupRect.top) / groupRect.height) * 100;
        const width = (rect.width / groupRect.width) * 100;
        const height = (rect.height / groupRect.height) * 100;
        that.selectRect = { left, top, width, height };

        const hoveRect = that.hoveRect;
        const { canvasScale } = that.main.section;
        // 判断是否与焦点rect一样
        if (
            hoveRect &&
            left === hoveRect.left &&
            top === hoveRect.top &&
            width === hoveRect.width &&
            height === hoveRect.height
        ) {
            that.cancelHove();
        }
        // 设置标尺刻度
        that.main.section.setRulerShadow(
            (rect.left - groupRect.left) / canvasScale,
            (rect.top - groupRect.top) / canvasScale,
            rect.width / canvasScale,
            rect.height / canvasScale
        );
    }

    /**
     * widget 双击事件
     * @param {MouseEvent} event
     * @param {BaseWidget} widget
     */
    @action.bound
    handleWidgetDBLClick(event: MouseEvent, widget: BaseWidget) {
        const that = this;
        that.switchWidget(event, widget);
    }

    switchWidget(event: MouseEvent, widget: BaseWidget) {
        const that = this;
        const {offsetX, offsetY} = event;
        const {cid, children} = widget.props;
        if (cid) {
            console.log(children)
        }
    }

    get groupConfig(): [] {
        return this._groupConfig;
    }

    set groupConfig(value: Array) {
        this._groupConfig = value;
    }
}
