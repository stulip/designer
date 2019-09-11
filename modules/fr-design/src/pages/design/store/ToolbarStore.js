/**
 * 设计器工具栏Store
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 10:47
 */
import type {MainStore} from "./MainStore.flow";
import {zoomScale} from '../config'
import {setConfig} from "react-hot-loader";

export class ToolbarStore {
    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
    }

    /**
     * 缩放设置
     */
    handleZoom = (value)=> {
        let that = this;
        const section = that.main.section;
        const contentScale = section.contentScale;
        switch (value) {
            case 1:
            case 2:
                const newScale = zoomScale.getInterval(contentScale);
                section.setContentScale(newScale[value - 1]);
                break;
            default:
                section.setContentScale(zoomScale.normal);
                break;
        }
    }
}
