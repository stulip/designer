/**
 * 设计器工具栏Store
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 10:47
 */
import {ENUM, zoomScale} from '../../../config/Config'
import {BaseStore} from "./BaseStore";
import {action, observable} from "mobx";

export class ToolbarStore extends BaseStore{

    @observable
    showToolbar: boolean = false;

    @action
    showOrHideToolbar = () => {
        this.showToolbar = !this.showToolbar;
    };

    addKeyListener (){
        let that = this;
        const KeyEvents = that.main.keyEvents;
        const section = that.main.section;

        // 放大 +
        KeyEvents.addListener("187", (event: KeyboardEvent) => {
            (event.metaKey || event.ctrlKey) && that.handleZoom(ENUM.ZOOM_P);
        });
        //缩小 -
        KeyEvents.addListener("189", (event: KeyboardEvent) => {
            (event.metaKey || event.ctrlKey) && that.handleZoom(ENUM.ZOOM_M);
        });
        // 还原大小 0
        KeyEvents.addListener("48", (event: KeyboardEvent) => {
            (event.metaKey || event.ctrlKey) && that.handleZoom(0);
        });

        // 保存 s
        KeyEvents.addListener("83", (event: KeyboardEvent) => {
            (event.metaKey || event.ctrlKey) && that.handleSave();
        });
    }

    handleSave = () => {
        this.main.handleSaveData();
    };

    /**
     * 缩放设置
     */
    handleZoom = (value) => {
        let that = this;
        const section = that.main.section;
        const contentScale = section.canvasScale;
        switch (value) {
            case ENUM.ZOOM_M:
            case ENUM.ZOOM_P:
                const newScale = zoomScale.getInterval(contentScale);
                section.setContentScale(newScale[value - 1]);
                break;
            default:
                section.setContentScale(zoomScale.normal);
                break;
        }
    };

    /**
     * 跳转到预览页面
     */
    handlePreview = () => {
        const that = this;
        const {isApp} = that.main.config;
        const url = isApp ? "/preview/app" : "/preview/web";
        window.open(`${url}?pageId=${that.main.pageId}`, "preview");
    }
}
