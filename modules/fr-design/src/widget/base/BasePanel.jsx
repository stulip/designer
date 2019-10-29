/**
 * 面板
 * @author tangzehua
 * @sine 2019-10-12 10:19
 */

// @flow
import React from "react";
import type {BaseWidgetProps} from "./BaseWidget";
import {BaseWidget} from "./BaseWidget";
import "../assets/panel.pcss";
import {LayoutConst, PropsConst} from "../../config/Attribute";
import {BasePanelConfig} from "./base.panel.config";

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
        return "";//"#fff"; 默认没有颜色
    }

    getBoxRect() {
        return {width: "initial", height: "initial", x: "initial", y: "initial"};
    }

    getBasicConfig() {
        const basic = super.getBasicConfig();
        basic.widgetHeight.disabled = false;
        basic.widgetWidth.disabled = false;
        return basic;
    }

    getDefaultConfig() {
        const that = this;
        const spCfg = super.getDefaultConfig();
        const rect = that.getBoxRect();
        return {
            ...spCfg,
            [PropsConst.layoutDirection]: LayoutConst.direction.row,
            [PropsConst.layoutAlignItems]: LayoutConst.alignItem.stretch,
            [PropsConst.layoutAlignSelf]: LayoutConst.alignSelf.auto,
            [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.flexStart,
            [PropsConst.layoutFlexGrow]: 1,
            // [PropsConst.layoutFlexShrink]: 0,
            [PropsConst.widgetWidth]: rect.width,
            [PropsConst.widgetHeight]: rect.height,
            [PropsConst.widgetX]: rect.x,
            [PropsConst.widgetY]: rect.y,
            [PropsConst.widgetBackground]: that.getBackground(),
        };
    }

    createWidgetProps(config): * {
        const data = super.createWidgetProps(config);
        data[PropsConst.widgetInitialWidth] = data[PropsConst.widgetWidth] !== "initial";
        data[PropsConst.widgetInitialHeight] = data[PropsConst.widgetHeight] !== "initial";
        return data;
    }

    widgetProps(child: Array<Object> = []): Array<Object> {
        const config = super.widgetProps();
        return [...config, ...child, ...BasePanelConfig()];
    }

    render() {
        const that = this;
        const {cid, children} = that.props;
        const data = that.formData;
        const width = data[PropsConst.widgetWidth];
        const height = data[PropsConst.widgetHeight];
        const initialWidth = data[PropsConst.widgetInitialWidth];
        const initialHeight = data[PropsConst.widgetInitialHeight];
        const backgroundColor = data[PropsConst.widgetBackground];

        const {layout} = that.styles;
        const size = {};
        if (initialWidth) size.maxWidth = width;
        if (initialHeight) size.maxHeight = height;
        const pStyle = {
            backgroundColor,
            ...size,
            ...layout.padding,
            ...layout.margin,
            ...layout.border,
            ...layout.radius,
            ...layout.flex.self
        };

        return (
            <div className={"group-flow"} style={pStyle} ref={that.widgetRef} data-cid={cid}>
                <div className={"view-panel"} style={layout.flex.child}>
                    {that.renderChild()}
                </div>
            </div>
        );
    }
}
