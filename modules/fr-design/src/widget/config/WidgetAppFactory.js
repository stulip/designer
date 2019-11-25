/**
 *
 * @author tangzehua
 * @sine 2019-11-20 10:44
 */
import {WidgetConst} from "./config";
import {randomId} from "../../config/Config";
import {PropsConst, TextConst} from "../../config/Attribute";

const App = WidgetConst.App;

export class WidgetAppFactory {

    /**
     * 带导航栏的新页面
     * @returns {{ids: [*, *, *], widgets: *[]}}
     */
    static get navigator() {
        const that = this;
        const Status = that[App.StatusBar];
        const Header = that[App.Header];
        const Operate = that[App.BottomOperateBar];
        const widgets = [...Status, ...Header, ...Operate];
        const root = {
            children: [Status[0].cid, Header[0].cid, Operate[0].cid]
        };
        return {root, widgets};
    }

    static get [App.StatusBar]() {
        return [{cid: randomId(), component: App.StatusBar}];
    }

    // header
    static get [App.Header]() {
        const rightWidget = {
            cid: randomId(),
            component: App.Panel,
            draggable: false,
            props: {default: {[PropsConst.layoutFlexGrow]: 0}}
        };

        const center = {
            cid: randomId(),
            component: App.Text,
            name: "标题",
            draggable: false,
            props: {default: {[PropsConst.textAlign]: TextConst.textAlign.center, [PropsConst.textSize]: 17}},
            children: "标题"
        };

        const widget = {
            cid: randomId(),
            component: App.Header,
            widget: {right: [rightWidget.cid], center: [center.cid]}
        };
        return [widget, center, rightWidget];
    }

    //面板
    static get [App.Panel]() {
        return [{cid: randomId(), component: App.Panel}];
    }

    static get [App.BottomOperateBar]() {
        return [{cid: randomId(), component: App.BottomOperateBar}];
    }

    // 文字
    static get [App.Text]() {
        const widget = {
            cid: randomId(),
            component: App.Text,
            children: "文本"
        };
        return [widget];
    }
}
