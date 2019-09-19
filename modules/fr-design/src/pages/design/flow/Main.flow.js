import { ToolbarStore } from "../store/ToolbarStore";
import { WidgetsStore } from "../store/WidgetsStore";
import { FooterStore } from "../store/FooterStore";
import { ScreensStore } from "../store/ScreensStore";
import { SectionStore } from "../store/SectionStore";

export type MainStore = {
    screens: ScreensStore,
    toolbar: ToolbarStore,
    widgets: WidgetsStore,
    footer: FooterStore,
    section: SectionStore
};

export type Rect = { x?: number, y?: number, width: number, height: number, top?: number, left?: number };


export type ConfigOption = {
    isApp: boolean, // 是否是App设计器
    customSize: {width: number, height: number}, // 自定义设计尺寸
    canvasSize: {width: number, height: number}, // canvasSize
}

export type PageConfig = {
    isApp: boolean, // 是否是App设计器
    designRect: ClientRect, // 设计尺寸信息
    canvasSize: {width: number, height: number}, // canvasSize
}
