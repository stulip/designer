
import {ToolbarStore} from "./ToolbarStore";
import {WidgetsStore} from "./WidgetsStore";
import {FooterStore} from "./FooterStore";
import {ScreensStore} from "./ScreensStore";
import {SectionStore} from "./SectionStore";

export type MainStore = {
    screens: ScreensStore;
    toolbar: ToolbarStore,
    widgets: WidgetsStore;
    footer: FooterStore;
    section: SectionStore;
}
