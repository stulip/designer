/**
 *
 * @author tangzehua
 * @sine 2019-10-18 16:53
 */

import {ItemConst} from "../../components/item";
import {PropsConst} from "../../config/Attribute";
import {Form} from "fr-ui";

const configLock = function ([left, center, right]) {
    right.disabled = data => !!data[center.form];
    right.union = data => [center.form, !!data[center.form] ? left.form : undefined];
    right.unionValue = (da, fd) => fd[left.form];
    return [left, center, right];
};

const getNumberLockItems = function (options) {
    const {
        center: { key: centerKey, value: centerValue = true },
        left,
        right
    } = options;
    return configLock([
        {
            form: left.key,
            type: Form.Const.Type.ConfirmInputNumber,
            input: { title: left.title }
        },
        {
            form: centerKey,
            type: ItemConst.Type.LockIconButton,
            value: centerValue
        },
        {
            form: right.key,
            type: Form.Const.Type.ConfirmInputNumber,
            input: { title: right.title }
        }
    ]);
};

export const BasePanelConfig = [
    {
        title: "背景颜色",
        type: ItemConst.Type.Background,
        form: PropsConst.widgetBackground,
        listener: PropsConst.widgetBackground,
        handlePicker: PropsConst.widgetColorHandle
    },
    {
        title: "布局",
        type: ItemConst.Type.Header,
        config: [
            {
                title: "方向",
                form: PropsConst.layoutDirection,
                type: Form.Const.Type.SelectIBot,
                select: {data: ItemConst.Direction.options}
            },
            [
                {
                    title: "拉伸",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutFlexGrow,
                    type: Form.Const.Type.ConfirmInputNumber,
                },
                {
                    title: "收缩",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutFlexShrink,
                    type: Form.Const.Type.ConfirmInputNumber,
                },
                {
                    title: "尺寸",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutFlexBasis,
                    type: Form.Const.Type.ConfirmInputNumber,
                }
            ],
            [
                {
                    title: "主轴空间",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutJustifyContent,
                    type: Form.Const.Type.SelectIBot,
                    select: {data: ItemConst.JustifyContent.options}
                },
                {
                    title: "次轴空间",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutAlignContent,
                    type: Form.Const.Type.SelectIBot,
                    select: { data: ItemConst.AlignContent.options }
                }
            ],
            [
                {
                    title: "次轴对齐",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutAlignItems,
                    type: Form.Const.Type.SelectIBot,
                    select: { data: ItemConst.AlignItems.options }
                },
                {
                    title: "次轴对齐(self)",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutAlignSelf,
                    type: Form.Const.Type.SelectIBot,
                    select: { data: ItemConst.AlignSelf.options }
                }
            ]
        ]
    },
    {
        title: "内边距",
        type: ItemConst.Type.Header,
        config: [
            getNumberLockItems({
                left: { key: PropsConst.layoutPaddingTop, title: "T" },
                center: { key: PropsConst.layoutPaddingVL },
                right: { key: PropsConst.layoutPaddingBottom, title: "B" }
            }),
            getNumberLockItems({
                left: { key: PropsConst.layoutPaddingLeft, title: "T" },
                center: { key: PropsConst.layoutPaddingHL },
                right: { key: PropsConst.layoutPaddingRight, title: "B" }
            })
        ]
    },
    {
        title: "外边距",
        type: ItemConst.Type.Header,
        config: [
            getNumberLockItems({
                left: { key: PropsConst.layoutMarginTop, title: "T" },
                center: { key: PropsConst.layoutMarginVL },
                right: { key: PropsConst.layoutMarginBottom, title: "B" }
            }),
            getNumberLockItems({
                left: { key: PropsConst.layoutMarginLeft, title: "T" },
                center: { key: PropsConst.layoutMarginHL },
                right: { key: PropsConst.layoutMarginRight, title: "B" }
            })
        ]
    },
    {
        title: "圆角",
        type: ItemConst.Type.Header,
        config: [
            getNumberLockItems({
                left: { key: PropsConst.layoutRadiusTopLeft, title: "TL" },
                center: { key: PropsConst.layoutRadiusVL },
                right: { key: PropsConst.layoutRadiusTopRight, title: "BR" }
            }),
            getNumberLockItems({
                left: { key: PropsConst.layoutRadiusBottomLeft, title: "BL" },
                center: { key: PropsConst.layoutRadiusHL },
                right: { key: PropsConst.layoutRadiusBottomRight, title: "BR" }
            })
        ]
    },
    {
        title: "边框",
        type: ItemConst.Type.Header,
        config: [
            {
                title: "样式",
                form: PropsConst.layoutBorderStyle,
                type: Form.Const.Type.SelectIBot,
                select: { data: ItemConst.BorderStyles.options }
            },
            getNumberLockItems({
                left: { key: PropsConst.layoutBorderTop, title: "T" },
                center: { key: PropsConst.layoutBorderVL },
                right: { key: PropsConst.layoutBorderBottom, title: "B" }
            }),
            configLock([
                {
                    form: PropsConst.layoutBorderTopColor,
                    type: ItemConst.Type.Color,
                    value: "#fff",
                    handlePicker: PropsConst.widgetColorHandle
                },
                {
                    form: PropsConst.layoutBorderColorVL,
                    type: ItemConst.Type.LockIconButton,
                    value: true
                },
                {
                    form: PropsConst.layoutBorderBottomColor,
                    type: ItemConst.Type.Color,
                    value: "#fff",
                    handlePicker: PropsConst.widgetColorHandle
                }
            ]),
            getNumberLockItems({
                left: { key: PropsConst.layoutBorderLeft, title: "L" },
                center: { key: PropsConst.layoutBorderHL },
                right: { key: PropsConst.layoutBorderRight, title: "R" }
            }),
            configLock([
                {
                    form: PropsConst.layoutBorderLeftColor,
                    type: ItemConst.Type.Color,
                    value: "#fff",
                    handlePicker: PropsConst.widgetColorHandle
                },
                {
                    form: PropsConst.layoutBorderColorHL,
                    type: ItemConst.Type.LockIconButton,
                    value: true
                },
                {
                    form: PropsConst.layoutBorderRightColor,
                    type: ItemConst.Type.Color,
                    value: "#fff",
                    handlePicker: PropsConst.widgetColorHandle
                }
            ])
        ]
    },
    { type: Form.Const.Type.Line, top: 0, bottom: 8 }
];
