/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-04 13:45
 */
import { observable, action, computed } from "mobx";
import { ToolbarStore } from "./ToolbarStore";
import { WidgetsStore } from "./WidgetsStore";
import { FooterStore } from "./FooterStore";
import { ScreensStore } from "./ScreensStore";
import { SectionStore } from "./SectionStore";
import { createConfig } from "../config";
import type {PageConfig, PageData} from "../flow/Main.flow";

export class MainStore {
    // 配置
    config: PageConfig;
    // store
    screens: ScreensStore;
    toolbar: ToolbarStore;
    widgets: WidgetsStore;
    footer: FooterStore;
    section: SectionStore;

    // 页面配置信息
    @observable
    pageData: PageData = {
        id: "007",
        // 背景颜色
        backgroundColor: "#fff"
    };

    // 颜色选择器
    @observable colorPickProps = { targetRect: null, color: "", onChange: ()=> {}};

    constructor(props) {
        let that = this;
        that.screens = new ScreensStore(that);
        that.toolbar = new ToolbarStore(that);
        that.widgets = new WidgetsStore(that);
        that.footer = new FooterStore(that);
        that.section = new SectionStore(that);
        that.init(props);
    }

    /**
     * 初始化
     */
    init(props) {
        let that = this;
        const { name } = props.match.params;
        that.config = createConfig({
            isApp: name === 'app',
        });
        const config = that.config;
        const options = {
            data: that.pageData,
        };
        that.section.init(config, options);
        that.widgets.init(config, options);
    }

    /**
     * 背景颜色设置(事件)
     */
    @action
    handleBackgroundColor = (event: MouseEvent) => {
        let that = this;
        that.handleColorPicker(event, that.pageData.backgroundColor, that.setBackgroundColor);
    };

    /**
     * 设置背景颜色
     * @param color
     */
    @action
    setBackgroundColor = (color)=> {
        this.pageData.backgroundColor = color;
    };

    /**
     * 颜色选择器
     * @param event
     * @param color
     * @param onChange
     */
    handleColorPicker = (event, color, onChange)=> {
        let that = this;
        that.colorPickProps.targetRect = event.target.getBoundingClientRect();
        that.colorPickProps.color = color;
        that.colorPickProps.onChange = onChange;
    }
}
