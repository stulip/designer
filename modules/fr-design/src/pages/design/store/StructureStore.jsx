/**
 * 左侧页面目录和结构目录store
 * @author tangzehua
 * @sine 2019-12-12 16:03
 */
import React from 'react';
import {BaseStore} from "./BaseStore";
import {DesignEvent} from 'fr-design';
import {PropsConst} from "../../../config";
import {action, observable} from "mobx";

export class StructureStore extends BaseStore {

    @observable.ref structureData = [];
    @observable.ref structureExpendKeys = [];
    @observable.ref structureSelectedKeys = [];

    structureSelectNode = null;
    structureRef = React.createRef();

    constructor(props) {
        super(props);
        this.initRoot = ::this.initRoot;
    }

    addListener() {
        const that = this;
        DesignEvent.addListener(PropsConst.rootWidgetInit, that.initRoot);
        DesignEvent.addListener(PropsConst.switchWidget, that.switchWidget);
        DesignEvent.addListener(PropsConst.addWidget, that.addWidget);
        DesignEvent.addListener(PropsConst.removeWidget, that.removeWidget);
        DesignEvent.addListener(PropsConst.widgetName, that.widgetNameUpdate);
    }

    removeListener() {
        const that = this;
        DesignEvent.removeListener(PropsConst.rootWidgetInit, that.initRoot);
        DesignEvent.removeListener(PropsConst.switchWidget, that.switchWidget);
        DesignEvent.removeListener(PropsConst.addWidget, that.addWidget);
        DesignEvent.removeListener(PropsConst.removeWidget, that.removeWidget);
        DesignEvent.removeListener(PropsConst.widgetName, that.widgetNameUpdate);
    }

    /**
     * @param {RootWidget} rootWidget
     */
    @action
    initRoot(rootWidget) {
        const that = this;
        that.structureExpendKeys = [];
        that.upStructureData(rootWidget);
    }

    /**
     * 更新结构树数据
     * @param {RootWidget} [rootWidget]
     */
    @action
    upStructureData(rootWidget) {
        const that = this;
        rootWidget = rootWidget || that.main.viewGroup.rootWidget;
        const map = (widgets) => {
            const data = [];
            for (const [key, value] of widgets) {
                value && data.push({
                    key,
                    icon: null,
                    title: value.getName(),
                    children: map(value.childrenMap)
                });
            }
            return data;
        };
        const data = map(rootWidget.childrenMap);
        if (!that.structureExpendKeys.length) {
            that.structureExpendKeys = data.map(da => da.key);
        }
        that.structureData = data;
    }

    @action
    onStructureExpand = (expandedKeys) => {
        this.structureExpendKeys = expandedKeys;
    };

    /**
     * widget 被点击
     * @param selectedKeys
     * @param node
     */
    onStructureSelect = (selectedKeys, {node}) => {
        const that = this;
        that.structureSelectNode = node;
        const [widgetId] = selectedKeys;
        const {viewGroup} = that.main;
        const widget = viewGroup.findWidget(widgetId);
        widget && viewGroup.setSelectWidget(widget);
    };

    /**
     * widget 鼠标移入
     * @param event
     * @param node
     */
    onStructureMouseEnter = ({event, node}) => {
        const that = this;
        const {eventKey: widgetId} = node.props;
        const {viewGroup} = that.main;
        const widget = viewGroup.findWidget(widgetId);
        widget && viewGroup.setHoverWidget(widget);
    };

    /**
     * widget 鼠标移除
     * @param event
     * @param node
     */
    onStructureMouseLeave = ({event, node}) => {
        const {viewGroup} = this.main;
        viewGroup.cancelHove();
    };

    @action
    switchWidget = (widget) => {
        const that = this;
        if (widget) {
            that.structureSelectedKeys = [widget.getId()];
        } else {
            that.structureSelectedKeys = [];
        }
    };

    addWidget = () => {
        this.upStructureData();
    };

    removeWidget = () => {
        this.upStructureData();
    };

    /**
     * widget 名称修改
     */
    @action
    widgetNameUpdate = () => {
        this.upStructureData();
    }
}
