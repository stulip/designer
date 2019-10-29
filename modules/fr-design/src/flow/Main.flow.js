import {ToolbarStore} from "../pages/design/store/ToolbarStore";
import {WidgetsStore} from "../pages/design/store/WidgetsStore";
import {FooterStore} from "../pages/design/store/FooterStore";
import {ScreensStore} from "../pages/design/store/ScreensStore";
import {SectionStore} from "../pages/design/store/SectionStore";
import {AttributeStore} from "../pages/design/store/AttributeStore";

export type MainStore = {
    screens: ScreensStore,
    toolbar: ToolbarStore,
    widgets: WidgetsStore,
    footer: FooterStore,
    section: SectionStore,
    attribute: AttributeStore
};

export type Size = {width: number, height: number};
export type Rect = { x?: number, y?: number, width: number, height: number, top?: number, left?: number };

export type DesignType = {
    width: number,
    height: number,
    top: number,
    bottom: number,
    name: string,
    radius: number,// 社保圆角
    type: string,// device 类型,
}


export type ConfigOption = {
    isApp: boolean, // 是否是App设计器
    customSize: {width: number, height: number}, // 自定义设计尺寸
    canvasSize: {width: number, height: number}, // canvasSize
}

export type PageConfig = {
    isApp: boolean, // 是否是App设计器
    designRect: DesignType, // 设计尺寸信息
    canvasSize: { width: number, height: number }, // canvasSize
}

export type PageData = {
    backgroundColor: string,
    id: string | number,
}

/**
 * widget 配置
 */
export type WidgetConfigDefined = {
    cid: string, // 唯一标识
    name: string, // 名称
    component: string, // widget 名称
    widgetProps: { default: WidgetProps, [string]: WidgetProps },// props css 属性
    children: string | Array<string>, // 子节点具体根据widget类型
    states: Array<WidgetState>
}

/**
 * widget 属性
 */
export type WidgetProps = {
    [string]: any
}

/**
 * widget 状态
 */
export type WidgetState = {
    name: string,
    union?: string | Array
    cid: string,
}
