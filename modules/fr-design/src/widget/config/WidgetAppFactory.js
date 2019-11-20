/**
 *
 * @author tangzehua
 * @sine 2019-11-20 10:44
 */
import {WidgetConst} from './config'
import {randomId} from "../../config/Config";
import {PropsConst, TextConst} from "../../config/Attribute";

const App = WidgetConst.App;

export class WidgetAppFactory {

    static get [App.StatusBar]() {
        return [{cid: randomId(), component: App.StatusBar}];
    }

    // header
    static get [App.Header]() {
        const rightWidget = {
            cid: randomId(),
            component: App.Panel,
            draggable: false,
            widgetProps: {default: {[PropsConst.layoutFlexGrow]: 0}}
        };

        const center = {
            cid: randomId(),
            component: App.Text,
            name: "标题",
            draggable: false,
            widgetProps: {default: {[PropsConst.textAlign]: TextConst.textAlign.center, [PropsConst.textSize]: 17}},
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
