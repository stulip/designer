/**
 * 设计器工具栏Store
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 10:47
 */
import type {MainStore} from "../../../flow/Main.flow";
import {zoomScale, ENUM} from '../../../config/Config'

export class ToolbarStore {
    main: MainStore;
    constructor (main: MainStore){
        let that = this;
        that.main = main;
        that.addKeyListener();
    }

    addKeyListener (){
        let that = this;
        const KeyEvents = that.main.keyEvents;
        const section = that.main.section;

        // 放大
        KeyEvents.addListener("187", (event: KeyboardEvent)=> {
            (event.metaKey || event.ctrlKey) && that.handleZoom(ENUM.ZOOM_P);
        });
        //缩小
        KeyEvents.addListener("189", (event: KeyboardEvent)=> {
            (event.metaKey || event.ctrlKey) && that.handleZoom(ENUM.ZOOM_M);
        });
        // 还原大小
        KeyEvents.addListener("48", (event: KeyboardEvent)=> {
            (event.metaKey || event.ctrlKey) && that.handleZoom(0);
        })
    }

    /**
     * 缩放设置
     */
    handleZoom = (value)=> {
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
    }
}
