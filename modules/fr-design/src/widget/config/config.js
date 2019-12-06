/**
 * 组件列表
 * @author tangzehua
 * @sine 2019-11-20 10:43
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
    Text: "web.text.1",
    Header: "web.header.1",
    DetailHeader: "web.detail.head.1",
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
        title: "页面头部",
        svg: "design/textarea",
        guideId: "web.head",
        webId: Web.Header
    },
    {
        title: "详情头部",
        svg: "design/textarea",
        guideId: "web.detail.head",
        webId: Web.DetailHeader
    }
]);
