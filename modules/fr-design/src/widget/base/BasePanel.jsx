/**
 * 面板
 * @author tangzehua
 * @sine 2019-10-12 10:19
 */

// @flow
import React from "react";
import type { BaseWidgetProps } from "./BaseWidget";
import { BaseWidget } from "./BaseWidget";
import "../assets/panel.pcss";
import { LayoutConst, PropsConst } from "../../config/Attribute";
import { Form } from "fr-ui";
import { BasePanelConfig } from "./BasePanel.config";

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
        return { width: "initial", height: "initial", x: "initial", y: "initial" };
    }

    /**
     * 布局信息
     * @returns {{}}
     */
    getLayoutConfig() {
        const { layout = {} } = this.props;
        return {
            [PropsConst.layoutDirection]: LayoutConst.direction.row,
            [PropsConst.layoutAlignItems]: LayoutConst.alignItem.stretch,
            [PropsConst.layoutAlignSelf]: LayoutConst.alignSelf.auto,
            [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.flexStart,
            ...layout
        };
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

        Object.assign(formData, that.getLayoutConfig());
        return formData;
    }

    widgetProps(): Array<Object> {
        const config = super.widgetProps();
        return [...config, ...BasePanelConfig];
    }

    renderWidget() {
        return this.props.children;
    }

    /**
     * 获取表单中布局style信息
     * @returns {{flex: Object, margin: Object, padding: Object}}
     */
    getLayoutStyles() {
        return Form.View.getFormatFormData(this.formData).layout;
    }

    render() {
        const that = this;
        const data = that.formData;
        const width = data[PropsConst.widgetWidth];
        const height = data[PropsConst.widgetHeight];
        const backgroundColor = data[PropsConst.widgetBackground];

        const styles = that.getLayoutStyles();
        const pStyle = {
            width,
            height,
            backgroundColor,
            ...styles.padding,
            ...styles.margin,
            ...styles.border,
            ...styles.radius
        };
        return (
            <div className={"group-flow"} style={pStyle} ref={that.widgetRef}>
                <div className={"view-panel"} style={styles.flex}>
                    {that.renderWidget()}
                </div>
            </div>
        );
    }
}
