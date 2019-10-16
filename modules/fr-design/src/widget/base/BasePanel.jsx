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
import { ItemConst } from "../../components";
import { PropsConst } from "../../config/Attribute";
import { Form } from "fr-ui";
import {DesignEvent} from "fr-web";

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
        // formData[PropsConst.widgetLayout] = that.getLayoutConfig();

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
                listener: PropsConst.widgetBackground,
                handlePicker: PropsConst.widgetBackgroundHandle
            },
            {
                title: "布局",
                type: ItemConst.Type.Header,
                config: [
                    {
                        title: '方向',
                        form: PropsConst.widgetDirection,
                        type: Form.Const.Type.Select,
                        select: {data: ItemConst.Direction.options}
                    },
                    [
                        {
                            title: '主轴空间',
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.widgetJustifyContent,
                            type: Form.Const.Type.Select,
                            select: {data: ItemConst.JustifyContent.options}
                        },
                        {
                            title: '次轴空间',
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.widgetAlignContent,
                            type: Form.Const.Type.Select,
                            select: {data: ItemConst.AlignContent.options}
                        }
                    ],
                    [
                        {
                            title: '次轴对齐(self)',
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.widgetAlignSelf,
                            type: Form.Const.Type.Select,
                            select: {data: ItemConst.AlignSelf.options}
                        },
                        {
                            title: '次轴对齐',
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.widgetAlignItem,
                            type: Form.Const.Type.Select,
                            select: {data: ItemConst.AlignItems.options}
                        }
                    ]
                ]
            },
            { type: Form.Const.Type.Line, top: 0, bottom: 8 },
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
