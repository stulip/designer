/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:18
 */
import { observable, action, computed } from "mobx";
import type { MainStore } from "../flow/Main.flow";
import { status_widget } from "./../components/svg";

export const SlideBarConfig = [
    { name: "status", svg: status_widget, tip: '状态', keyboard: '`'},
    { name: "widget", svgName: "design/common_widget", tip: '内置组件', keyboard: 1 },
    { name: "my_widget", svgName: "design/my_widget", tip: '我的组件', keyboard: 2 },
    { name: "icons", svgName: "design/smiley", tip: '图标', keyboard: 3 },
    { name: "master", svgName: "design/master", tip: '母版', keyboard: 4 },
    { name: "trash", svgName: "recycle", className: "trash-button", tip:'回收站' }
];

export class WidgetsStore {
    // 左侧面板是否折叠
    @observable isLeftPanelOpen = false;

    // slide bar 激活类型
    @observable slideActiveType = 0;

    // 左侧面板宽度
    @observable _leftPanelWidth = 0;
    // 左侧面板实际大小
    @observable leftPanelVXWidth = 240;

    main: MainStore;
    constructor(main: MainStore) {
        this.main = main;
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

    @action
    handleSlideActive = event => {
        let that = this;
        const dataType = event.currentTarget.getAttribute("data-type");
        if (that.slideActiveType === dataType) {
            that.slideActiveType = 0;
        } else {
            switch (dataType) {
                case 'status':
                case 'widget':
                case 'my_widget':
                case 'icons':
                case 'master':
                    that.slideActiveType = dataType;
                    break;
                default:
                    break;
            }
        }
    };

    setSlideActiveType (dataType){

    }

    @action
    handleSlidePanelClose = ()=> {
        this.slideActiveType = 0;
    }
}
