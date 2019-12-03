/**
 * 事件
 * @author tangzehua
 * @sine 2019-11-28 15:00
 */
import React from "react";
import {BaseStore} from "./BaseStore";
import {Form, SVG} from "fr-ui";
import {action, observable} from "mobx";
import {DesignEvent} from "fr-web";
import {BehaviorConst, PropsConst, randomId} from "../../../config";
import {ItemConst} from "../../../components/item";

export class EventsStore extends BaseStore {
    // form
    formRef = React.createRef();

    get form() {
        return this.formRef.current;
    }

    // 表单数据
    @observable.ref formConfig = [];
    events;

    /**
     * 初始化
     * @param {PageConfig} config 页面配置信息
     * @param {{data: PageData }} [options]
     */
    init(config, options = {}) {
        let that = this;
        that.events = [];
        that.formConfig = [];
    }

    createFieldConfig() {
        const that = this;
        const {isApp} = that.main.config;
        return (that.events || []).map((event, index, events) => ({
            className: "event-item",
            config: [
                {
                    form: `${index}.cid`,
                    value: event.cid
                },
                [
                    {
                        form: `${index}.name`,
                        type: Form.Const.Type.IBotInput,
                        className: "event-input",
                        value: event.name,
                        rules: true,
                    },
                    {
                        type: ItemConst.Type.IBotIcon,
                        value: "删除",
                        svg: {icon: SVG.trash, className: "trash", onClick: () => that.handleDelEvent(event.cid)}
                    }
                ],
                {
                    title: "类型",
                    form: `${index}.type`,
                    type: Form.Const.Type.IBotSelect,
                    select: {data: ItemConst.EventType.options({isApp})},
                    value: event.type
                },
                {type: Form.Const.Type.Line, top: 0, left: 6, right: 6,},
                {
                    title: "行为",
                    form: `${index}.behavior`,
                    type: Form.Const.Type.IBotSelect,
                    select: {data: ItemConst.EventBehavior.options},
                    value: event.behavior || ItemConst.EventBehavior.default,
                },
                {
                    title: "行为表达式",
                    form: `${index}.exps`,
                    type: Form.Const.Type.IBotInput,
                    className: "event-input",
                    value: event.exps,
                    titleDirection: Form.Const.Direction.Top
                },
                {type: Form.Const.Type.Line, top: 0, left: 6, right: 6,},
                // --------- 行为 - 页面 ---------
                {
                    title: "页面类型",
                    form: `${index}.pageType`,
                    type: Form.Const.Type.IBotSelect,
                    union: `${index}.behavior`,
                    value: event.pageType || ItemConst.PageType.default,
                    select: {data: ItemConst.PageType.options({isApp})},
                    visible: data => Number(data[`${index}.behavior`]) === BehaviorConst.switchPage
                },
                {
                    title: "页面URL",
                    form: `${index}.pageURL`,
                    type: Form.Const.Type.IBotInput,
                    className: "event-input",
                    titleDirection: Form.Const.Direction.Top,
                    union: `${index}.behavior`,
                    value: event.pageURL,
                    visible: data => Number(data[`${index}.behavior`]) === BehaviorConst.switchPage
                },
                {
                    title: "页面参数",
                    form: `${index}.pageArgs`,
                    type: Form.Const.Type.IBotInput,
                    className: "event-input",
                    titleDirection: Form.Const.Direction.Top,
                    union: `${index}.behavior`,
                    visible: data => Number(data[`${index}.behavior`]) === BehaviorConst.switchPage
                },
                // --------- 行为 - 页面 ---------
                // --------- 行为 - 切换状态 ---------
                {
                    title: '组件',
                    form: `${index}.widget`,
                    type: Form.Const.Type.IBotSelect,
                    union: `${index}.behavior`,
                    value: event.widget,
                    select: {data: ItemConst.PageType.options({isApp})},
                    visible: data => Number(data[`${index}.behavior`]) === BehaviorConst.switchState
                },
                {
                    title: '目标',
                    form: `${index}.widgetState`,
                    type: Form.Const.Type.IBotSelect,
                    union: `${index}.behavior`,
                    value: event.widgetState,
                    select: {data: ItemConst.PageType.options({isApp})},
                    visible: data => Number(data[`${index}.behavior`]) === BehaviorConst.switchState
                },
                // --------- 行为 - 切换状态 ---------
                // --------- 行为 - 存储值 ---------
                {
                    title: "值表达式",
                    form: `${index}.variable`,
                    type: Form.Const.Type.IBotInput,
                    className: "event-input",
                    titleDirection: Form.Const.Direction.Top,
                    union: `${index}.behavior`,
                    value: event.variable,
                    visible: data => Number(data[`${index}.behavior`]) === BehaviorConst.variable
                },
                // --------- 行为 - 存储值 ---------
                // --------- 行为 - 工作流 ---------
                {
                    title: '工作流',
                    form: `${index}.workflow`,
                    type: Form.Const.Type.IBotSelect,
                    union: `${index}.behavior`,
                    value: event.workflow,
                    select: {data: ItemConst.PageType.options({isApp})},
                    visible: data => Number(data[`${index}.behavior`]) === BehaviorConst.workFlow
                },
                // --------- 行为 - 工作流 ---------
                {
                    form: "length",
                    value: events.length
                }
            ]
        }));
    }

    addListener() {
        const that = this;
        DesignEvent.addListener(PropsConst.switchWidget, that.switchWidget);
        DesignEvent.addListener(PropsConst.rootWidgetInit, that.rootInit);
        DesignEvent.addListener(PropsConst.switchWidgetState, that.switchWidgetState);
    }

    removeListener() {
        const that = this;
        DesignEvent.removeListener(PropsConst.switchWidget, that.switchWidget);
        DesignEvent.removeListener(PropsConst.rootWidgetInit, that.rootInit);
        DesignEvent.removeListener(PropsConst.switchWidgetState, that.switchWidgetState);
    }

    /**
     * root widget 初始化之后
     * @param {RootWidget} widget
     */
    rootInit = widget => {
        this.switchWidget(widget);
    };

    /**
     * 监听widget 切换
     * @param {BaseWidget} [widget]
     */
    switchWidget = widget => {
        const that = this;
        widget = widget || that.main.viewGroup.sWidget;
        if (widget) {
            const events = widget.getEvents();
            that.events !== events && that._setConfig(events);
        }
    };

    /**
     * 监听widget 状态切换
     * @param {BaseWidget} widget
     * @param {string} stateId
     */
    switchWidgetState = (widget, stateId) => {
        this.switchWidget(widget);
    };

    /**
     * @param {Array} events
     */
    @action
    _setConfig = events => {
        const that = this;
        that.events = events;
        that.formConfig = that.createFieldConfig();
    };

    /**
     * 添加事件
     * @param event
     */
    handleAddEvent = (event: MouseEvent) => {
        const that = this;
        const {viewGroup} = that.main;
        const widget = viewGroup.sWidget;
        const events = widget.getEvents();

        //  新的事件
        events.push({
            cid: randomId(),
            name: `事件 ${events.length}`
        });
        that._setConfig(events);
    };

    handleFormData = (data: Object) => {
        const that = this;
        const formData = that.form.validateData();
        if (formData) {
            const {sWidget} = that.main.viewGroup;
            sWidget.setEvents(that.events = Array.from(formData));
        }
    };

    /**
     * 删除事件
     * @param cid 事件ID
     */
    @action
    handleDelEvent(cid: string) {
        const that = this;
        const ix = that.events.findIndex(event => event.cid === cid);
        that.events.splice(ix, 1);
        that.main.viewGroup.sWidget.setEvents(that.events);
        that._setConfig(that.events);
    }
}
