/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:18
 */
import {action, computed, observable} from "mobx";
import {SVG} from "fr-ui";
import {BaseStore} from "./BaseStore";
import type {WidgetState} from "../../../flow/Main.flow";

export const SlideBarConfig = [
    {name: "status", svg: SVG.status_widget, tip: "状态", keyboard: "`", keyCode: '192'},
    {name: "widget", svgName: "design/common_widget", tip: "内置组件", keyboard: 1, keyCode: '49'},
    {name: "my_widget", svgName: "design/my_widget", tip: "我的组件", keyboard: 2, keyCode: '50'},
    {name: "icons", svgName: "design/smiley", tip: "图标", keyboard: 3, keyCode: '51'},
    {name: "master", svgName: "design/master", tip: "母版", keyboard: 4, keyCode: '52'},
    {name: "trash", svgName: "recycle", className: "trash-button", tip: "回收站"}
];

export class WidgetsStore extends BaseStore {
    // 左侧面板是否折叠
    @observable isLeftPanelOpen = false;

    // slide bar 激活类型
    @observable slideActiveType = 0;
    // state slide panel 激活
    @observable stateSlideActive = false;

    // 左侧面板宽度
    @observable _leftPanelWidth = 0;
    // 左侧面板实际大小
    @observable leftPanelVXWidth = 240;

    // widget 状态列表
    @observable _widgetStates;
    @observable _activeStateId;

    // 全局属性状态
    globalStateId;
    globalStates = [];

    addKeyListener() {
        let that = this;
        SlideBarConfig.forEach(da => {
            da.keyCode &&
            that.main.keyEvents.addListener(String(da.keyCode), that.handleSlideKeys.bind(that, da.name));
        });
    }

    /**
     * 初始化
     * @param {PageConfig} config 页面配置信息
     * @param {Object} [options]
     */
    @action
    init(config, options = {}) {
        let that = this;
        const { isApp } = config;
        that.isLeftPanelOpen = !isApp;
    }

    @action.bound
    handleLeftPanelToggle() {
        this.isLeftPanelOpen = !this.isLeftPanelOpen;
    }

    @computed
    get leftPanelWidth() {
        return this.isLeftPanelOpen ? 0 : this.leftPanelVXWidth;
    }

    handleSlideKeys(dataType, event: KeyboardEvent) {
        this.setSlideActiveType(dataType);
    }

    /**
     * 工具栏按钮被点击
     * @param event
     */
    handleSlideActive = event => {
        let that = this;
        const dataType = event.currentTarget.getAttribute("data-type");
        that.setSlideActiveType(dataType);
    };

    @action
    switchState = (stateId: string) => {
        const that = this;
        that._activeStateId = stateId;
        that.main.viewGroup.switchWidgetState(stateId);
    };

    /**
     * 设置弹出工具面板打开类型
     * @param dataType
     */
    @action
    setSlideActiveType(dataType) {
        let that = this;
        if (that.slideActiveType === dataType) {
            that.handleSlidePanelClose();
        } else {
            switch (dataType) {
                case "status":
                    that.stateSlideActive = !that.stateSlideActive;
                    break;
                case "widget":
                case "my_widget":
                case "icons":
                case "master":
                    that.slideActiveType = dataType;
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * 设置widget状态
     * @param {Array<WidgetState>} [states]
     * @param {string} [activeId]
     */
    @action
    setWidgetStates(states, activeId) {
        this._widgetStates = states;
        this._activeStateId = activeId;
    }

    get widgetStates() {
        return this._widgetStates || this.globalStates;
    }

    get activeStateId() {
        return this._activeStateId || this.globalStateId;
    }

    /**
     * 关闭工具面板
     */
    @action
    handleSlidePanelClose = () => {
        this.slideActiveType = 0;
    };

    /**
     * 关闭state面板
     */
    @action
    handleStatePanelClose = () => {
        this.stateSlideActive = false;
    }
}
