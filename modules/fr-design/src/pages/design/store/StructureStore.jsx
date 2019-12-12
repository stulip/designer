/**
 * 左侧页面目录和结构目录store
 * @author tangzehua
 * @sine 2019-12-12 16:03
 */
import {BaseStore} from "./BaseStore";
import {DesignEvent} from 'fr-design';
import {PropsConst} from "../../../config";
import {action, observable} from "mobx";

export class StructureStore extends BaseStore {

    @observable structureData = [];

    constructor(props) {
        super(props);
        this.initRoot = ::this.initRoot;
    }

    addListener() {
        const that = this;
        DesignEvent.addListener(PropsConst.rootWidgetInit, that.initRoot);
    }

    removeListener() {
        const that = this;
        DesignEvent.removeListener(PropsConst.rootWidgetInit, that.initRoot);
    }

    /**
     * @param {RootWidget} rootWidget
     */
    @action
    initRoot(rootWidget) {
        const that = this;
        that.upStructureData(rootWidget);
    }

    /**
     * 更新结构树数据
     * @param {RootWidget} rootWidget
     */
    @action
    upStructureData(rootWidget) {
        const that = this;
        const map = (widgets) => {
            const data = [];
            for (const [key, value] of widgets) {
                value && data.push({
                    key,
                    title: value.getName(),
                    children: map(value.childrenMap)
                });
            }
            return data;
        };
        that.structureData = map(rootWidget.childrenMap);
    }
}
