/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-10-10 10:25
 */
import React from "react";
import {action, observable} from "mobx";
import type {BaseWidget} from "../../../widget/base";
import {BaseStore} from "./BaseStore";
import {DesignEvent, Toast} from "fr-design";
import {PropsConst} from "../../../config/Attribute";
import type {PageConfig, PageData, WidgetConfigDefined, WidgetState} from "../../../flow/Main.flow";
import WidgetModule, {WidgetAppFactory, WidgetWebFactory} from "../../../widget";
import {Dialog} from "fr-ui";
import {CloneWidget} from "../../../widget/config";

export class ViewGroupStore extends BaseStore {
    // 复制的widget
    _copyWidgets;
    @observable.ref rootWidgetConfig;
    // 所有的widget配置 cid -> widget
    _widgetMap: Map<string, WidgetConfigDefined> = new Map();
    rootRef = React.createRef();

    /**
     * @returns {RootWidget}
     */
    get rootWidget() {
        return this.rootRef.current;
    }

    // 鼠标悬浮元素
    @observable hoveRect: ClientRect;
    // 选中元素
    @observable selectRect: ClientRect;

    // 做双击判断
    dbWidgetDownTimer: number = 0;
    // 选中的widget
    _widget: BaseWidget; // 鼠标点击选中的widget
    hoverWidget: BaseWidget; // 鼠标滑过选中的widget
    widgetList: [BaseWidget] = [];
    widgetList2: [BaseWidget] = [];

    originDragPosition = null; // 拖拽按下时相对元素坐标

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

    addKeyListener() {
        const that = this;
        const KeyEvents = that.main.keyEvents;
        // delete
        KeyEvents.addListener("46", (event: KeyboardEvent) => {
            that.handleRemoveWidget();
        });

        // ctrl/meta + c
        KeyEvents.addListener("67", (event: KeyboardEvent) => {
            (event.ctrlKey || event.metaKey) && that.handleCopyWidget();
        });

        // ctrl/meta + v
        KeyEvents.addListener("86", (event: KeyboardEvent) => {
            (event.ctrlKey || event.metaKey) && that.handlePasteWidget();
        });
    }

    @action
    init(config: PageConfig, options: { data: PageData } = {}) {
        let that = this;
        const {isApp} = config;
        const {data: {widgets, id}} = options;

        if (!widgets || !widgets.length) {
            if (isApp) {
                const {root, widgets} = WidgetAppFactory.navigator;
                that.rootWidgetConfig = root;
                that.widgetMap = widgets;
            } else {
                const {root, widgets} = WidgetWebFactory.navigator;
                that.rootWidgetConfig = root;
                that.widgetMap = widgets;
            }
        } else {
            that.rootWidgetConfig = widgets.find(wi => wi.cid === id);
            that.widgetMap = widgets;
        }

        // 动态导入
        WidgetModule[isApp ? "App" : "Web"]()
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
        that.main.widgets.setWidgetStates(that.rootWidget.getWidgetStates(), that.rootWidget.getStateId());

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
        const widget = that.widget || that.rootWidget;
        widget.switchStates(stateId);
        DesignEvent.emit(PropsConst.switchWidgetState, widget, stateId);
    }

    /**
     * 删除所选widget
     */
    handleRemoveWidget = () => {
        const that = this;
        if (that.widget) {
            if (that.widget.isDelete()) {
                const options = {
                    done: () => {
                        that.widget.removeSelf();
                        that.cancelSelect();
                    }
                };
                Dialog.confirm(`确认删除所选组件【${that.widget.getName()}】?`, options);
            } else {
                Toast.info(`此组件【${that.widget.getName()}】不支持删除!`);
            }
        }
    };

    /**
     * 复制widget
     */
    handleCopyWidget = () => {
        const that = this;
        if (that.widget) {
            that._copyWidgets = that.widget.widgetData;
        }
    };

    /**
     * 粘贴 widget
     */
    handlePasteWidget = () => {
        const that = this;
        if (that._copyWidgets) {
            const [root] = that._copyWidgets;
            const cloneWidgets = CloneWidget(that._copyWidgets);
            that.setWidgetMap(cloneWidgets);
            if (that.widget) {
                if (root.cid === that.widget.getId()) {
                    that.widget.parentWidget.pastWidget(cloneWidgets[0].cid, root.cid);
                } else {
                    that.widget.pastWidget(cloneWidgets[0].cid, root.cid);
                }
            } else {
                that.rootWidget.pastWidget(cloneWidgets[0].cid, root.cid);
            }
        }
    };

    /**
     * 添加状态
     * @param state
     */
    addWidgetState(state: WidgetState) {
        const that = this;
        const widget = that.widget || that.rootWidget;
        widget.addState(state);
        that.switchWidgetState(state.cid);
        that.main.widgets.setWidgetStates(widget.getWidgetStates(), widget.getStateId());
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
        let dragWidgetId = that.rootWidget.getDragWidgetId();
        if (!dragWidgetId && widget) {
            that.rootWidget.setDragWidgetId(dragWidgetId = widget.getId());
            const box = widget.widget.getBoundingClientRect();
            that.originDragPosition = {x: event.pageX - box.left, y: event.pageY - box.top};
            if (that.widget) {
                that.widget.setDragWidgetId(dragWidgetId);
            }
        }
        if (dragWidgetId) {
            that.main.widgets.handleWidgetDragMove(event, dragWidgetId, that.originDragPosition);
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
            if (widget === that.widget || (parent === parentWidget & parentWidget !== that.rootWidget)) {
                break;
            }
            lastWidget = widget;
        }
        return lastWidget;
    }

    @action
    _handleMouseEnter = (widget: BaseWidget) => {
        const that = this;
        if (!that.rootWidget) return;
        const rootRect = that.rootWidget.widget.getBoundingClientRect();
        const rect = widget.widget.getBoundingClientRect();
        const left = ((rect.left - rootRect.left) / rootRect.width) * 100;
        const top = ((rect.top - rootRect.top) / rootRect.height) * 100;
        const width = (rect.width / rootRect.width) * 100;
        const height = (rect.height / rootRect.height) * 100;

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
        if (!that.rootWidget) return;
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
            that.hoverWidget && that.hoverWidget.isDraggable() && that.addMoveListener();
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
        that.rootWidget.setDragWidgetId(null);
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
        if (!that.rootWidget || !element) return;
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

        const rootRect = that.rootWidget.widget.getBoundingClientRect();
        const left = ((rect.left - rootRect.left) / rootRect.width) * 100;
        const top = ((rect.top - rootRect.top) / rootRect.height) * 100;
        const width = (rect.width / rootRect.width) * 100;
        const height = (rect.height / rootRect.height) * 100;
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
            (rect.left - rootRect.left) / canvasScale,
            (rect.top - rootRect.top) / canvasScale,
            rect.width / canvasScale,
            rect.height / canvasScale
        );
    }

    /**
     *
     * @returns {Map<string, WidgetConfigDefined>}
     */
    get widgetMap(): Map<string, WidgetConfigDefined> {
        return this._widgetMap;
    }

    set widgetMap(value: Array<WidgetConfigDefined> | Map<string, WidgetConfigDefined>) {
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

    get widget(): BaseWidget {
        return this._widget;
    }

    set widget(widget: BaseWidget) {
        if (widget !== this._widget) {
            this._widget = widget;
            DesignEvent.emit(PropsConst.switchWidget, widget);
        }
    }

    /**
     * 返回选择的widget或者root widget
     * @returns {BaseWidget|RootWidget}
     */
    get sWidget() {
        return this.widget || this.rootWidget;
    }

    /**
     * 根据widget id 获取实例widget对象
     * @param widgetId
     * @returns {BaseWidget}
     */
    findWidget(widgetId) {
        const that = this;
        if (widgetId === that.rootWidget.getId()) return that.rootWidget;
        const widget = that.widgetMap.get(widgetId);
        return widget && widget.target;
    }
}
