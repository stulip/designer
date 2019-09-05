/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-04 13:45
 */
import {observable, action, computed} from 'mobx';
import {ToolbarStore} from './ToolbarStore'
import {WidgetsStore} from "./WidgetsStore";
import {FooterStore} from "./FooterStore";
import {ScreensStore} from "./ScreensStore";
import {SectionStore} from "./SectionStore";

export class MainStore {

    screens: ScreensStore;
    toolbar: ToolbarStore;
    widgets: WidgetsStore;
    footer: FooterStore;
    section: SectionStore;

    constructor (){
        let that = this;
        that.screens = new ScreensStore(that);
        that.toolbar = new ToolbarStore(that);
        that.widgets = new WidgetsStore(that);
        that.footer = new FooterStore(that);
        that.section = new SectionStore(that);
    }
}
