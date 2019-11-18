import {randomId} from "../config/Config";
import {PropsConst, TextConst} from "../config/Attribute";

/**
 * widget 配置
 * @author tangzehua
 * @sine 2019-10-14 15:06
 */

const App = Object.freeze({
    StatusBar: "app.status.bar.1",
    Header: "app.header.1",
    BottomOperateBar: "app.bottom.operate.bar.1",
    Text: "app.text.1",
    Panel: "app.panel.1"
});

const Web = Object.freeze({
    Panel: "web.panel.1",
    Text: "web.text.1"
});

export const WidgetConst = Object.freeze({
    App,
    Web,
    INITIAL: "initial",
    AppHeaderHeight: 44 // 默认导航栏高度
});

// Basic Widget
export const BasicWidgets = Object.freeze([
    {
        title: "面板",
        svg: "design/rectangle",
        guideId: "basic.panel",
        appId: App.Panel,
        webId: Web.Panel
    },
    {
        title: "文本",
        svg: "design/text",
        guideId: "basic.text",
        appId: App.Text,
        webId: Web.Text
    },
    {
        title: "按钮",
        svg: "design/button",
        guideId: "basic.button"
    },
    {
        title: "单行输入",
        svg: "design/input",
        guideId: "basic.input"
    },
    {
        title: "多行输入",
        svg: "design/textarea",
        guideId: "basic.textarea"
    },
    {
        title: "图片",
        svg: "design/image",
        guideId: "basic.image"
    }
]);

// App Widget
export const AppWidgets = Object.freeze([
    {
        title: "状态栏",
        svg: "design/input",
        guideId: "app.statusbar",
        appId: App.StatusBar
    },
    {
        title: "导航栏",
        svg: "design/textarea",
        guideId: "app.header",
        appId: App.Header
    }
]);

export const WebWidgets = Object.freeze([
    {
        title: "导航栏",
        svg: "design/textarea",
        guideId: "web.header",
        webId: App.Header
    }
]);

export class WidgetFactory {
    // header
    static get [App.Header]() {
        const rightWidget = {
            cid: randomId(),
            component: App.Panel,
            widgetProps: {default: {[PropsConst.layoutFlexGrow]: 0}}
        };

        const center = {
            cid: randomId(),
            component: App.Text,
            name: "标题",
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

/**
 * 转换widget到目标widget
 * @param {Array<string>} widgets 目标widget数组
 * @param {string} targetWidgetId 目标 widget
 * @param {string} widgetId 需要换位的 widget
 * @param {-1|1} dir 方向 -1 = 后面 1 = 前面
 * @returns []
 */
export function SwapWidget(widgets, targetWidgetId, widgetId, dir) {
    const widgetIx = widgets.indexOf(widgetId);
    const targetIx = widgets.indexOf(targetWidgetId);

    // 移动位置
    const move = () => {
        const newGroup = [];
        widgets.forEach(data => {
            if (data === widgetId) return;

            if (data === targetWidgetId) {
                dir !== 1 ? newGroup.push(data, widgetId) : newGroup.push(widgetId, data);
            } else {
                newGroup.push(data);
            }
        });
        return newGroup;
    };

    // 是否和目标widget 在同一个widget中
    if (targetIx !== -1 && widgetIx !== -1) {
        // 不需要移动
        if (targetIx - dir === widgetIx) {
            return widgets;
        }
        return move();
    }
    return widgets;
}
