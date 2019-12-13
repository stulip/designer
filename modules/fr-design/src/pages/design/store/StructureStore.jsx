/**
 * 左侧页面目录和结构目录store
 * @author tangzehua
 * @sine 2019-12-12 16:03
 */
import {BaseStore} from "./BaseStore";
import {DesignEvent} from 'fr-design';
import {PropsConst} from "../../../config";
import {action, observable} from "mobx";

export class StructureStore extends BaseStore {

    @observable structureData = [];
    @observable structureExpendKeys = [];

    constructor(props) {
        super(props);
        this.initRoot = ::this.initRoot;
    }

    addListener() {
        const that = this;
        DesignEvent.addListener(PropsConst.rootWidgetInit, that.initRoot);
    }

    removeListener() {
        const that = this;
        DesignEvent.removeListener(PropsConst.rootWidgetInit, that.initRoot);
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
     * @param {RootWidget} rootWidget
     */
    @action
    upStructureData(rootWidget) {
        const that = this;
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
     */
    onStructureSelect = (selectedKeys) => {
        const that = this;
        const [widgetId] = selectedKeys;
        const {viewGroup} = that.main;
        const widget = viewGroup.findWidget(widgetId);
        widget && viewGroup.setSelectWidget(widget)
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
    }
}
