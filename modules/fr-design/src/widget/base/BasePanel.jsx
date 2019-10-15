/**
 * 面板
 * @author tangzehua
 * @sine 2019-10-12 10:19
 */

// @flow
import React from "react";
import { BaseWidget } from "./BaseWidget";
import type { BaseWidgetProps } from "./BaseWidget";
import "../assets/panel.pcss";
import { ItemConst } from "../../pages/design/components/item";
import { PropsConst } from "../../config/Attribute";
import { Form } from "fr-ui";

export type BasePanelProps = {
    ...BaseWidgetProps
};

type State = {};

export class BasePanel extends BaseWidget<BasePanelProps, State> {
    /**
     * 背景颜色
     * @returns {string}
     */
    getBackground() {
        return "#fff";
    }

    getBoxRect() {
        return { width: 'initial', height: 'initial', x: 'initial', y: 'initial' };
    }

    /**
     * 布局信息
     * @returns {{}}
     */
    getLayoutConfig (){
        return {}
    }

    initWidgetFormData() {
        const that = this;
        const formData = super.initWidgetFormData();
        const rect = that.getBoxRect();
        formData[PropsConst.widgetBackground] = that.getBackground();
        formData[PropsConst.widgetWidth] = rect.width;
        formData[PropsConst.widgetHeight] = rect.height;
        formData[PropsConst.widgetX] = rect.x;
        formData[PropsConst.widgetY] = rect.y;
        formData[PropsConst.widgetLayout] = that.getLayoutConfig();

        return formData;
    }

    widgetProps(): Array<Object> {
        const that = this;
        const config = super.widgetProps();
        return [
            ...config,
            {
                title: "背景颜色",
                type: ItemConst.Type.Background,
                form: PropsConst.widgetBackground,
                listener: PropsConst.widgetBackground
                // handlePicker: that.main.handleBackgroundColor
            },
            { type: Form.Const.Type.Line, top: 10 },
            {
                title: "布局",
                type: ItemConst.Type.Layout,
                form: PropsConst.widgetLayout
            },
            { type: Form.Const.Type.Line, top: 10 }
        ];
    }

    renderWidget() {
        const { children } = this.props;
        return <div className={"view-panel"}>{children}</div>;
    }

    render() {
        const that = this;
        const data = that.formData;
        const width = data[PropsConst.widgetWidth];
        const height = data[PropsConst.widgetHeight];
        const backgroundColor = data[PropsConst.widgetBackground];

        return (
            <div className={"group-flow"} style={{ width, height, backgroundColor }} ref={that.widgetRef}>
                {that.renderWidget()}
            </div>
        );
    }
}
