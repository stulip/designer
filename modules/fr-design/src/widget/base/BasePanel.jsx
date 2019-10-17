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
import {LayoutConst, PropsConst} from "../../config/Attribute";
import { Form } from "fr-ui";
import {DesignEvent} from "fr-web";
import {Tools} from "@xt-web/core";

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
        const {layout = {}} = this.props;
        return {
            [PropsConst.layoutDirection]: LayoutConst.direction.row,
            [PropsConst.layoutAlignItems]: LayoutConst.alignItem.stretch,
            [PropsConst.layoutAlignSelf]: LayoutConst.alignSelf.auto,
            [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.flexStart,
            ...layout
        }
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
                        form: PropsConst.layoutDirection,
                        type: Form.Const.Type.Select,
                        select: {data: ItemConst.Direction.options}
                    },
                    [
                        {
                            title: '主轴空间',
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutJustifyContent,
                            type: Form.Const.Type.Select,
                            select: {data: ItemConst.JustifyContent.options}
                        },
                        {
                            title: '次轴空间',
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutAlignContent,
                            type: Form.Const.Type.Select,
                            select: {data: ItemConst.AlignContent.options}
                        }
                    ],
                    [
                        {
                            title: '次轴对齐',
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutAlignItems,
                            type: Form.Const.Type.Select,
                            select: {data: ItemConst.AlignItems.options}
                        },
                        {
                            title: '次轴对齐(self)',
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutAlignSelf,
                            type: Form.Const.Type.Select,
                            select: {data: ItemConst.AlignSelf.options}
                        }
                    ]
                ]
            },
            {
                title: "内边距",
                type: ItemConst.Type.Header,
                config: [
                    [
                        {
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutPaddingTop,
                            type: Form.Const.Type.ConfirmInputNumber,
                            input: {title: "T"}
                        },
                        {
                            type: ItemConst.Type.LockIconButton,
                            form: PropsConst.layoutPaddingVL,
                        },
                        {
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutPaddingBottom,
                            type: Form.Const.Type.ConfirmInputNumber,
                            input: {title: "B"},
                            disabled: data => !!data[PropsConst.layoutPaddingVL],
                            union: data => [PropsConst.layoutPaddingVL, !!data[PropsConst.layoutPaddingVL] ? PropsConst.layoutPaddingTop: undefined] ,
                            unionValue: (da, fd) => fd[PropsConst.layoutPaddingTop],
                        }
                    ],
                    [

                        {
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutPaddingLeft,
                            type: Form.Const.Type.ConfirmInputNumber,
                            input: {title: "L"},
                        },
                        {
                            type: ItemConst.Type.LockIconButton,
                            form: PropsConst.layoutPaddingHL,
                        },
                        {
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutPaddingRight,
                            type: Form.Const.Type.ConfirmInputNumber,
                            input: {title: "R"},
                            disabled: data => !!data[PropsConst.layoutPaddingHL],
                            union: data => [PropsConst.layoutPaddingHL, !!data[PropsConst.layoutPaddingHL] ? PropsConst.layoutPaddingLeft: undefined] ,
                            unionValue: (da, fd) => fd[PropsConst.layoutPaddingLeft],
                        }
                    ]
                ],
            },
            {
                title: "外边距",
                type: ItemConst.Type.Header,
                config: [
                    [
                        {
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutMarginTop,
                            type: Form.Const.Type.ConfirmInputNumber,
                            input: {title: "T"}
                        },
                        {
                            type: ItemConst.Type.LockIconButton,
                            form: PropsConst.layoutMarginVL,
                        },
                        {
                            titleDirection: Form.Const.Direction.Bottom,
                            form: PropsConst.layoutMarginBottom,
                            type: Form.Const.Type.ConfirmInputNumber,
                            input: {title: "B"},
                            disabled: data => !!data[PropsConst.layoutMarginVL],
                            union: data => [PropsConst.layoutMarginVL, !!data[PropsConst.layoutMarginVL] ? PropsConst.layoutMarginTop: undefined] ,
                            unionValue: (da, fd) => fd[PropsConst.layoutMarginTop],
                        },
                    ],
                   [

                       {
                           titleDirection: Form.Const.Direction.Bottom,
                           form: PropsConst.layoutMarginLeft,
                           type: Form.Const.Type.ConfirmInputNumber,
                           input: {title: "L"},
                       },
                       {
                           type: ItemConst.Type.LockIconButton,
                           form: PropsConst.layoutMarginHL,
                       },
                       {
                           titleDirection: Form.Const.Direction.Bottom,
                           form: PropsConst.layoutMarginRight,
                           type: Form.Const.Type.ConfirmInputNumber,
                           input: {title: "R"},
                           disabled: data => !!data[PropsConst.layoutMarginHL],
                           union: data => [PropsConst.layoutMarginHL, !!data[PropsConst.layoutMarginHL] ? PropsConst.layoutMarginLeft: undefined] ,
                           unionValue: (da, fd) => fd[PropsConst.layoutMarginLeft],
                       },
                   ]
                ],
            },
            { type: Form.Const.Type.Line, top: 0, bottom: 8 },
        ];
    }

    renderWidget() {
        return this.props.children;
    }

    /**
     * 获取表单中布局style信息
     * @returns {{flex: Object, margin: Object, padding: Object}}
     */
    getLayoutStyles (){
        return this.formatFormData().layout;
    }

    render() {
        const that = this;
        const data = that.formData;
        const width = data[PropsConst.widgetWidth];
        const height = data[PropsConst.widgetHeight];
        const backgroundColor = data[PropsConst.widgetBackground];

        const styles = that.getLayoutStyles();
        const pStyle = {width, height, backgroundColor, ...styles.padding, ...styles.margin, ...styles.border};
        return (
            <div className={"group-flow"} style={pStyle} ref={that.widgetRef}>
                <div className={"view-panel"} style={styles.flex}>
                    {that.renderWidget()}
                </div>
            </div>
        );
    }
}
