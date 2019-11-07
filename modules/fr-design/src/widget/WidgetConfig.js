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
    Panel: "app.panel.1",
});

const Web = Object.freeze({
    Panel: "web.panel.1",
    Text: "web.text.1",
});

export const WidgetConst = Object.freeze({
    App,
    Web,
    INITIAL: "initial",
    AppHeaderHeight: 44,// 默认导航栏高度
});

// Basic Widget
export const BasicWidgets = Object.freeze([
    {
        title: "面板",
        svg: "design/rectangle",
        guideId: "panel",
        appId: App.Panel,
        webId: Web.Panel,
    },
    {
        title: '文本',
        svg: "design/text",
        guideId: "text",
        appId: App.Text,
        webId: Web.Text,
    },
    {
        title: "按钮",
        svg: "design/button",
        guideId: "button",
    },
    {
        title: "单行输入",
        svg: "design/input",
        guideId: "input",
    },
    {
        title: "多行输入",
        svg: "design/textarea",
        guideId: 'textarea'
    },
    {
        title: "图片",
        svg: "design/image",
        guideId: "image"
    }
]);

// App Widget
export const AppWidgets = Object.freeze([
    {
        title: "状态栏",
        svg: "design/input",
        guideId: 'statusbar',
        appId: App.StatusBar
    },
    {
        title: "导航栏",
        svg: "design/textarea",
        guideId: 'header',
        appId: App.Header
    }
]);
