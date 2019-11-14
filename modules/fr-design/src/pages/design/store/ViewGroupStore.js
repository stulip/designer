/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-10-10 10:25
 */
import React from "react";
import {action, computed, observable} from "mobx";
import {BaseWidget} from "../../../widget/base/BaseWidget";
import {BaseStore} from "./BaseStore";
import {DesignEvent} from "fr-web";
import {PropsConst} from "../../../config/Attribute";
import {Types} from "@xt-web/core";
import type {PageConfig, PageData, WidgetConfigDefined, WidgetState} from "../../../flow/Main.flow";
import WidgetModule from "../../../widget";

export class ViewGroupStore extends BaseStore {
    // 组件布局
    @observable _groupConfig = [];
    _widgetMap: Map<string, WidgetConfigDefined> = new Map();
    groupRef = React.createRef();

    get group() {
        return this.groupRef.current;
    }

    // 鼠标悬浮元素
    @observable hoveRect: ClientRect;
    // 选中元素
    @observable selectRect: ClientRect;

    // 做双击判断
    dbWidgetDownTimer: number = 0;
    // 选中的widget
    widget: BaseWidget; // 鼠标点击选中的widget
    hoverWidget: BaseWidget; // 鼠标滑过选中的widget
    widgetList: [BaseWidget] = [];
    widgetList2: [BaseWidget] = [];

    // 拖动的widget id
    @observable dragWidgetId = null;
    originDragPosition = null; // 拖拽按下是先对元素坐标

    // 全局属性状态
    globalStateId;
    globalStates = [];

    // 所有widget模块引用
    @observable.ref widgetModule;

    addListener() {
        const that = this;
        // mouse
        DesignEvent.addListener(PropsConst.widgetMouseDown, that.handleWidgetDown);
        DesignEvent.addListener(PropsConst.widgetMouseExit, that.handleWidgetMouseExit);
        DesignEvent.addListener(PropsConst.widgetMouseEnter, that.handleWidgetMouseEnter);

        //widget basic
    }

    removeListener() {
        const that = this;
        // mouse
        DesignEvent.removeListener(PropsConst.widgetMouseDown, that.handleWidgetDown);
        DesignEvent.removeListener(PropsConst.widgetMouseExit, that.handleWidgetMouseExit);
        DesignEvent.removeListener(PropsConst.widgetMouseEnter, that.handleWidgetMouseEnter);

        //widget basic
    }

    init(config: PageConfig, options: { data: PageData } = {}) {
        let that = this;
        const {isApp} = config;
        // 动态导入
        WidgetModule[isApp ? "App" : "Web"]
            .then(action(module => (that.widgetModule = module)))
            .catch(e => window.console.log(e));
    }

    /**
     * 鼠标移除
     * @param {MouseEvent} event
     * @param {BaseWidget} widget
     */
    @action.bound
    handleWidgetMouseExit(event: MouseEvent, widget: BaseWidget) {
        this.hoverWidget === widget && this.cancelHove();
    }

    @action
    cancelHove = () => {
        this.hoveRect = null;
        this.hoverWidget = null;
    };

    // 取消选中元素
    @action
    cancelSelect = () => {
        let that = this;
        // 还原标尺刻度
        const {canvasRect} = that.main.section;
        that.main.section.setRulerShadow(0, 0, canvasRect.width, canvasRect.height);
        that.main.attribute.setConfig();
        that.main.widgets.setWidgetStates(that.globalStates, that.globalStateId);

        if (that.widget) {
            that.widget.onUpdate = null;
        }

        that.selectRect = null;
        that.widget = null;
        that.widgetList = [];
        that.widgetList2 = [];
    };

    /**
     * 设置选中widget
     * @param {BaseWidget} [widget]
     */
    @action
    setSelectWidget = (widget?: BaseWidget) => {
        let that = this;
        if (widget !== that.widget) {
            widget.onUpdate = that._reWidgetSelectBox;
            that.main.widgets.setWidgetStates(widget.getWidgetStates(), widget.getStateId());
            that.main.attribute.setConfig(widget.getWidgetProps(), widget.getFormData());
            that.widget = widget;
            that.hoverWidget = widget;
        }
    };

    /**
     * 切换widget状态
     * @param {string} stateId
     */
    switchWidgetState(stateId: string) {
        const that = this;
        const widget = that.widget;
        if (widget) {
            if (stateId !== widget.stateId) {
                widget.switchStates(stateId);
                that.main.attribute.setConfig(widget.getWidgetProps(), widget.getFormData());
            }
        } else {
            that.globalStateId = stateId;
        }
    }

    /**
     * 添加状态
     * @param state
     */
    addWidgetState(state: WidgetState) {
        const that = this;
        const widget = that.widget;
        if (widget) {
            widget.addState(state);
            widget.switchStates(state.cid);
            that.main.widgets.setWidgetStates(widget.getWidgetStates(), widget.getStateId());
        } else {
            that.globalStates.push(state);
            that.globalStateId = state.cid;
            that.main.widgets.setWidgetStates(that.globalStates, state.cid);
        }
    }

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
        that.setSelectBox(that.widget.widget);
    };

    /**
     * widget获得鼠标焦点
     * @param {MouseEvent} event
     * @param {BaseWidget} widget
     */
    handleWidgetMouseEnter = (event: MouseEvent, widget: BaseWidget) => {
        let that = this;
        that.widgetList2.push(widget);
        clearTimeout(that._widgetEnterTimer);
        that._widgetEnterTimer = setTimeout(that._eachWidgetEnter, 0);
    };

    /**
     * widget move drag
     * @param {MouseEvent} event
     */
    @action
    handleMouseMove = (event: MouseEvent) => {
        const that = this;
        const widget = (that.hoverWidget || that.widget);
        if (!that.dragWidgetId && widget) {
            that.dragWidgetId = widget.getId();
            const box = widget.widget.getBoundingClientRect();
            that.originDragPosition = {x: event.pageX - box.left, y: event.pageY - box.top};
            if (that.widget) {
                that.widget.setDragWidgetId(that.dragWidgetId);
            }
        }
        if (that.dragWidgetId) {
            that.main.widgets.handleWidgetDragMove(event, that.dragWidgetId, that.originDragPosition);
        }
    };

    _eachWidgetEnter = () => {
        const that = this;
        let lastWidget = that.getMouseWidgetSelect(that.widgetList2);
        lastWidget && that._handleMouseEnter(lastWidget);
        that.widgetList2 = [];
    };

    getMouseWidgetSelect(widgets) {
        const that = this;
        // text panel header
        let lastWidget = widgets[0];
        const parentWidget = that.widget && that.widget.parentWidget;
        for (const widget of widgets) {
            const parent = widget.parentWidget;
            if (widget === that.widget || (!Types.isEmpty(parent) && parent === parentWidget)) {
                break;
            }
            lastWidget = widget;
        }
        return lastWidget;
    }

    @action
    _handleMouseEnter = (widget: BaseWidget) => {
        const that = this;
        if (!that.group) return;
        const groupRect = that.group.getBoundingClientRect();
        const rect = widget.widget.getBoundingClientRect();
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
            that.hoveRect = {left, top, width, height};
            that.hoverWidget = widget;
        }
    };

    /**
     * widget 单击事件
     * @param {MouseEvent} event
     * @param {BaseWidget} widget
     */
    handleWidgetDown = (event: MouseEvent, widget: BaseWidget) => {
        let that = this;
        if (!that.group) return;
        that.widgetList.push(widget);
        clearTimeout(that._widgetClickTimer);
        that._widgetClickTimer = setTimeout(that._eachWidgetClickEvent, 0);
    };

    _eachWidgetClickEvent = () => {
        const that = this;
        if (Date.now() - that.dbWidgetDownTimer < 200) {
            that.dbWidgetDownTimer = 0;
            // text panel header
            let lastWidget = that.getMouseWidgetSelect(that.widgetList);
            if (lastWidget) {
                // 设置选框
                that.setSelectBox(lastWidget.widget);
                that.setSelectWidget(lastWidget);
            }
        } else {
            that.dbWidgetDownTimer = Date.now();
            that.addMoveListener();
        }
        that.widgetList = [];
    };

    addMoveListener() {
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("mousemove", this.handleMouseMove);
    }

    removeMoveListener() {
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    @action
    handleMouseUp = (event: MouseEvent) => {
        const that = this;
        that.dragWidgetId = null;
        that.originDragPosition = null;
        that.removeMoveListener();
        that.main.widgets.onWidgetDragEnd();
        if (that.widget) {
            that.widget.setDragWidgetId(null);
        }
    };

    /**
     * 设置选中边框
     * @param element
     */
    @action
    setSelectBox(element: Element) {
        let that = this;
        if (!that.group) return;
        let rect = element.getBoundingClientRect();
        const margin = {};
        ({
            marginTop: margin.top,
            marginBottom: margin.bottom,
            marginLeft: margin.left,
            marginRight: margin.right
        } = element.style);

        rect = {
            width: rect.width + parseInt(margin.left || 0) + parseInt(margin.right || 0),
            height: rect.height + parseInt(margin.top || 0) + parseInt(margin.bottom || 0),
            left: rect.left - parseInt(margin.left || 0),
            top: rect.top - parseInt(margin.top || 0)
        };

        const groupRect = that.group.getBoundingClientRect();
        const left = ((rect.left - groupRect.left) / groupRect.width) * 100;
        const top = ((rect.top - groupRect.top) / groupRect.height) * 100;
        const width = (rect.width / groupRect.width) * 100;
        const height = (rect.height / groupRect.height) * 100;
        that.selectRect = {left, top, width, height};

        const hoveRect = that.hoveRect;
        const {canvasScale} = that.main.section;
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

    @computed
    get groupConfig(): [string] {
        return this._groupConfig.slice();
    }

    set groupConfig(value: Array) {
        this._groupConfig = value;
    }

    /**
     * 添加新的组件
     * @param {string} widgetId
     */
    @action
    addNewWidget(widgetId) {
        this._groupConfig.push(widgetId);
        this.dragWidgetId = widgetId;
    }

    @action
    removeWidget(widgetId: string) {
        const that = this;
        that.dragWidgetId = null;
        that._groupConfig.remove(widgetId);
    }

    /**
     *
     * @returns {Map<string, WidgetConfigDefined>}
     */
    get widgetMap(): Map<string, WidgetConfigDefined> {
        return this._widgetMap;
    }

    set widgetMap(value: Array | Map<string, WidgetConfigDefined>) {
        if (Array.isArray(value)) {
            const widgets = new Map();
            value.forEach(widget => widgets.set(widget.cid, widget));
            this._widgetMap = widgets;
        } else {
            this._widgetMap = value;
        }
    }

    /**
     * 添加widget到widget Map
     * @param widgets
     */
    setWidgetMap(widgets: WidgetConfigDefined[]) {
        widgets.forEach(widget => this._widgetMap.set(widget.cid, widget));
    }

    /**
     * 从 widget Map 删除 widget
     * @param widgets
     */
    deleteWidgetMap(widgets: WidgetConfigDefined[]) {
        widgets.forEach(widget => this._widgetMap.delete(widget.cid));
    }

    createWidget(widgetIds: string | string[], widgetMap: Map<string, WidgetConfigDefined>) {
        const that = this;
        widgetMap = widgetMap || that.widgetMap;
        const names = Array.isArray(widgetIds) ? widgetIds : [widgetIds];

        const {
            config: {designRect},
            section: {canvasRect, canvasScale}
        } = that.main;

        return names.map(cid => {
            const widget = widgetMap.get(cid);
            if (!widget) return null;
            const Comp = that.widgetModule[widget.component];

            return (
                Comp && (
                    <Comp
                        key={widget.cid}
                        {...widget}
                        canvasRect={canvasRect}
                        designRect={designRect}
                        widgetMap={widgetMap}
                        module={that.widgetModule}
                        isDrag={that.dragWidgetId === widget.cid}
                    />
                )
            );
        });
    }
}
