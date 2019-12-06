/**
 *
 * @author tangzehua
 * @sine 2019-11-20 10:42
 */
import {randomId} from "../../config/Config";
import {WidgetConst} from "./config";
import {LayoutConst, PropsConst} from "../../config";

const Web = WidgetConst.Web;

export class WidgetWebFactory {
    static get navigator() {
        const that = this;
        const Header = that[Web.Header];
        const Tabs = {
            cid: randomId(),
            component: Web.Panel,
            draggable: false,
            name: "页签",
            props: {default: {[PropsConst.widgetHeight]: 40, [PropsConst.widgetBackground]: "#f1f4f8"}}
        };
        const widgets = [...Header, Tabs];
        const root = {
            children: [Header[0].cid, Tabs.cid],
            props: {default: {[PropsConst.background]: "#f1f4f8"}}
        };
        return {root, widgets};
    }

    //面板
    static get [Web.Panel]() {
        return [{cid: randomId(), component: Web.Panel}];
    }

    // 文字
    static get [Web.Text]() {
        const widget = {
            cid: randomId(),
            component: Web.Text,
            children: "文本"
        };
        return [widget];
    }

    // 头部
    static get [Web.Header]() {
        return [{cid: randomId(), component: Web.Header, props: {default: {[PropsConst.widgetHeight]: 44}}}];
    }

    // 详情页面头部
    static get [Web.DetailHeader]() {
        const that = this;
        const root = [],
            contentChildren = [];

        const [contentWidget] = that[Web.Panel];
        contentWidget.children = contentChildren;
        contentWidget.props = {default: {[PropsConst.layoutDirection]: LayoutConst.direction.column}};
        contentWidget.draggable = false;

        const widget = {
            cid: randomId(),
            component: Web.DetailHeader,
            widget: {children: contentWidget.cid}
        };

        root.push(widget, contentWidget);

        {
            const [div] = that[Web.Panel];
            const [div2] = that[Web.Panel];
            const [text1] = that[Web.Text];
            const [text2] = that[Web.Text];

            div.props = {
                default: {
                    [PropsConst.layoutAlignItems]: LayoutConst.alignItem.flexEnd
                }
            };
            div.children = [text1.cid, text2.cid, div2.cid];

            text1.props = {
                default: {
                    [PropsConst.widgetWidth]: 300,
                    [PropsConst.textColor]: "#666"
                }
            };
            text1.children = "PTFM201901300003";

            text2.props = {
                default: {
                    [PropsConst.layoutFlexGrow]: "",
                    [PropsConst.textSize]: 14,
                    [PropsConst.textLineHeight]: 24,

                    [PropsConst.layoutRadiusTopLeft]: 12,
                    [PropsConst.layoutRadiusTopRight]: 12,
                    [PropsConst.layoutRadiusBottomLeft]: 12,
                    [PropsConst.layoutRadiusBottomRight]: 12,

                    [PropsConst.layoutPaddingRight]: 12,
                    [PropsConst.layoutPaddingLeft]: 12,

                    [PropsConst.textColor]: "#fff",
                    [PropsConst.widgetBackground]: "#6c3"
                }
            };
            text2.children = "有效";

            div2.props = {default: {[PropsConst.layoutAlignSelf]: LayoutConst.alignSelf.stretch}};

            root.push(div, text1, text2, div2);
            contentChildren.push(div.cid);
        }

        {
            const [div] = that[Web.Panel];
            const [text1] = that[Web.Text];

            div.props = {
                default: {
                    [PropsConst.layoutAlignItems]: LayoutConst.alignItem.center,
                    [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.center
                }
            };
            div.children = [text1.cid];
            text1.children = "High Fructose Syrup";
            text1.props = {
                default: {
                    [PropsConst.textSize]: 24,
                    [PropsConst.textColor]: "#06c"
                }
            };

            root.push(div, text1);
            contentChildren.push(div.cid);
        }

        {
            const [div] = that[Web.Panel];
            const divChildren = [];
            div.props = {
                default: {
                    [PropsConst.layoutAlignItems]: LayoutConst.alignItem.center,
                    [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.flexStart
                }
            };
            div.children = divChildren;

            ["产品类型", "产品规格", "海关编码", "分管人"].forEach(name => {
                const [div] = that[Web.Panel];
                div.children = [];
                div.props = {
                    default: {
                        [PropsConst.layoutFlexGrow]: "",
                        [PropsConst.widgetBackground]: "#eee",
                        [PropsConst.layoutRadiusTopLeft]: 15,
                        [PropsConst.layoutRadiusTopRight]: 15,
                        [PropsConst.layoutRadiusBottomLeft]: 15,
                        [PropsConst.layoutRadiusBottomRight]: 15,
                        [PropsConst.layoutPaddingRight]: 12,
                        [PropsConst.layoutPaddingLeft]: 12,
                        [PropsConst.layoutPaddingTop]: 4,
                        [PropsConst.layoutPaddingBottom]: 4,
                        [PropsConst.layoutMarginRight]: 30
                    }
                };

                {
                    const [text1] = that[Web.Text];
                    text1.children = name;
                    text1.props = {
                        default: {
                            [PropsConst.textColor]: "#969da3",
                            [PropsConst.layoutMarginRight]: 20
                        }
                    };
                    root.push(text1);
                    div.children.push(text1.cid);
                }
                {
                    const [text1] = that[Web.Text];
                    text1.children = "------------";
                    root.push(text1);
                    div.children.push(text1.cid);
                }
                root.push(div);
                divChildren.push(div.cid);
            });

            root.push(div);
            contentChildren.push(div.cid);
        }
        return root;
    }
}
