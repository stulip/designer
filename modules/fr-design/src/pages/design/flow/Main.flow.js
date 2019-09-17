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
