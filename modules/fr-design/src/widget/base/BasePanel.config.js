/**
 *
 * @author tangzehua
 * @sine 2019-10-18 16:53
 */

import { ItemConst } from "../../components/item";
import { PropsConst } from "../../config/Attribute";
import { Form } from "fr-ui";

const getHVLockItems = function(options) {
    const {
        center: { key: centerKey, value: centerValue = true },
        left,
        right
    } = options;
    return [
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
            input: { title: right.title },
            disabled: data => !!data[centerKey],
            union: data => [centerKey, !!data[centerKey] ? left.key : undefined],
            unionValue: (da, fd) => fd[left.key]
        }
    ];
};

export const BasePanelConfig = [
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
                title: "方向",
                form: PropsConst.layoutDirection,
                type: Form.Const.Type.Select,
                select: { data: ItemConst.Direction.options }
            },
            [
                {
                    title: "主轴空间",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutJustifyContent,
                    type: Form.Const.Type.Select,
                    select: { data: ItemConst.JustifyContent.options }
                },
                {
                    title: "次轴空间",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutAlignContent,
                    type: Form.Const.Type.Select,
                    select: { data: ItemConst.AlignContent.options }
                }
            ],
            [
                {
                    title: "次轴对齐",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutAlignItems,
                    type: Form.Const.Type.Select,
                    select: { data: ItemConst.AlignItems.options }
                },
                {
                    title: "次轴对齐(self)",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutAlignSelf,
                    type: Form.Const.Type.Select,
                    select: { data: ItemConst.AlignSelf.options }
                }
            ]
        ]
    },
    {
        title: "内边距",
        type: ItemConst.Type.Header,
        config: [
            getHVLockItems({
                left: { key: PropsConst.layoutPaddingTop, title: "T" },
                center: { key: PropsConst.layoutPaddingVL },
                right: { key: PropsConst.layoutPaddingBottom, title: "B" }
            }),
            getHVLockItems({
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
            getHVLockItems({
                left: { key: PropsConst.layoutMarginTop, title: "T" },
                center: { key: PropsConst.layoutMarginVL },
                right: { key: PropsConst.layoutMarginBottom, title: "B" }
            }),
            getHVLockItems({
                left: { key: PropsConst.layoutMarginLeft, title: "T" },
                center: { key: PropsConst.layoutMarginHL },
                right: { key: PropsConst.layoutMarginRight, title: "B" }
            }),
        ]
    },
    {
        title: "圆角",
        type: ItemConst.Type.Header,
        config: [
            getHVLockItems({
                left: { key: PropsConst.layoutRadiusTopLeft, title: "TL" },
                center: { key: PropsConst.layoutRadiusVL },
                right: { key: PropsConst.layoutRadiusTopRight, title: "BR" }
            }),
            getHVLockItems({
                left: { key: PropsConst.layoutRadiusBottomLeft, title: "BL" },
                center: { key: PropsConst.layoutRadiusHL },
                right: { key: PropsConst.layoutRadiusBottomRight, title: "BR" }
            }),
        ]
    },
    { type: Form.Const.Type.Line, top: 0, bottom: 8 }
];
