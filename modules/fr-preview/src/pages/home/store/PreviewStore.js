/**
 *
 * @author tangzehua
 * @sine 2019-12-05 14:05
 */

import {Storage} from "@xt-web/core";
import {Config, WidgetModule} from "fr-design";
import {action, observable} from "mobx";

export class PreviewStore {

    config = {};
    pageId;
    widgetMap = new Map();
    rootConfig = {};

    @observable.ref widgetModule;

    constructor(props) {
        const that = this;
        const {id, name} = props.match.params;
        that.config = Config.createConfig({
            isApp: name === 'app'
        });
        that.pageId = id;
        that.init();
    }

    init() {
        const that = this;
        const {isApp} = that.config;
        const {widgets} = Storage.local.getItem(`${Config.ENUM.PAGE}-${that.pageId}`, {widgets: []});
        that.rootConfig = widgets.find(wi => wi.cid === that.pageId);
        widgets.forEach(widget => that.widgetMap.set(widget.cid, widget));

        // 动态导入
        WidgetModule[isApp ? "App" : "Web"]()
            .then(action(module => (that.widgetModule = module)))
            .catch(e => window.console.log(e));

    }

}
