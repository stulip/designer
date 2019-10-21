/**
 *
 * @author tangzehua
 * @sine 2019-10-18 16:53
 */

import { ItemConst } from "../../components/item";
import { PropsConst } from "../../config/Attribute";
import { Form } from "fr-ui";

const configLock = function([left, center, right]) {
    right.disabled = data => !!data[center.form];
    right.union = data => [center.form, !!data[center.form] ? left.form : undefined];
    right.unionValue = (da, fd) => fd[left.form];
    return [left, center, right];
};

const getNumberLockItems = function(options, all = {}, first = {}) {
    const {
        center: { key: centerKey, value: centerValue = true },
        left,
        right
    } = options;
    return configLock([
        {
            form: left.key,
            type: left.type || Form.Const.Type.ConfirmInputNumber,
            value: left.value,
            input: { title: left.title },
            handlePicker: left.handlePicker
        },
        {
            form: centerKey,
            type: ItemConst.Type.LockIconButton,
            value: centerValue,
            union: all.key,
            unionValue: (dx, data) => (dx ? dx : data[centerKey])
        },
        {
            form: right.key,
            type: right.type || Form.Const.Type.ConfirmInputNumber,
            value: right.value,
            input: { title: right.title },
            handlePicker: right.handlePicker
        }
    ]);
};

const groupNumberLockItems = function(options) {
    const {
        all: { key: allKey, value: allValue = true },
        top,
        bottom
    } = options;

    if (allValue) {
        top.center.value = allValue;
        bottom.center.value = allValue;
    }

    const aLock = {
        form: allKey,
        type: ItemConst.Type.LockIconButton,
        className: "lock",
        value: allValue,
        union: [top.center.key, bottom.center.key],

        unionValue: (fc, data) => {
            const topLk = data[top.center.key];
            const bottomLk = data[bottom.center.key];
            const bcLk = data[allKey];

            return bcLk ? topLk && bottomLk : bcLk;
        }
    };

    const all = { key: allKey, value: allValue };
    const topInput = getNumberLockItems(top, all);
    const bottomInput = getNumberLockItems(bottom, all);
    bottomInput[0] = configLock([topInput[0], aLock, bottomInput[0]])[2];
    return {
        className: "lock-hv-view",
        config: [aLock, { style: { flex: 1 }, config: [topInput, bottomInput] }]
    };
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
                select: { data: ItemConst.Direction.options }
            },
            [
                {
                    title: "拉伸",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutFlexGrow,
                    type: Form.Const.Type.ConfirmInputNumber
                },
                {
                    title: "收缩",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutFlexShrink,
                    type: Form.Const.Type.ConfirmInputNumber
                },
                {
                    title: "尺寸",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutFlexBasis,
                    type: Form.Const.Type.ConfirmInputNumber
                }
            ],
            [
                {
                    title: "主轴空间",
                    titleDirection: Form.Const.Direction.Bottom,
                    form: PropsConst.layoutJustifyContent,
                    type: Form.Const.Type.SelectIBot,
                    select: { data: ItemConst.JustifyContent.options }
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
            groupNumberLockItems({
                all: { key: PropsConst.layoutPaddingVH, value: false },
                top: {
                    left: { key: PropsConst.layoutPaddingTop, title: "T" },
                    center: { key: PropsConst.layoutPaddingVL },
                    right: { key: PropsConst.layoutPaddingBottom, title: "B" }
                },
                bottom: {
                    left: { key: PropsConst.layoutPaddingLeft, title: "L" },
                    center: { key: PropsConst.layoutPaddingHL },
                    right: { key: PropsConst.layoutPaddingRight, title: "R" }
                }
            })
        ]
    },
    {
        title: "外边距",
        type: ItemConst.Type.Header,
        config: [
            groupNumberLockItems({
                all: { key: PropsConst.layoutMarginVH, value: false },
                top: {
                    left: { key: PropsConst.layoutMarginTop, title: "T" },
                    center: { key: PropsConst.layoutMarginVL },
                    right: { key: PropsConst.layoutMarginBottom, title: "B" }
                },
                bottom: {
                    left: { key: PropsConst.layoutMarginLeft, title: "T" },
                    center: { key: PropsConst.layoutMarginHL },
                    right: { key: PropsConst.layoutMarginRight, title: "B" }
                }
            })
        ]
    },
    {
        title: "圆角",
        type: ItemConst.Type.Header,
        config: [
            groupNumberLockItems({
                all: { key: PropsConst.layoutRadiusVH },
                top: {
                    left: { key: PropsConst.layoutRadiusTopLeft, title: "TL" },
                    center: { key: PropsConst.layoutRadiusVL },
                    right: { key: PropsConst.layoutRadiusTopRight, title: "BR" }
                },
                bottom: {
                    left: { key: PropsConst.layoutRadiusBottomLeft, title: "BL" },
                    center: { key: PropsConst.layoutRadiusHL },
                    right: { key: PropsConst.layoutRadiusBottomRight, title: "BR" }
                }
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
            groupNumberLockItems({
                all: { key: PropsConst.layoutBorderVH },
                top: {
                    left: { key: PropsConst.layoutBorderTop, title: "T" },
                    center: { key: PropsConst.layoutBorderVL },
                    right: { key: PropsConst.layoutBorderBottom, title: "B" }
                },
                bottom: {
                    left: { key: PropsConst.layoutBorderLeft, title: "L" },
                    center: { key: PropsConst.layoutBorderHL },
                    right: { key: PropsConst.layoutBorderRight, title: "R" }
                }
            }),
            groupNumberLockItems({
                all: { key: PropsConst.layoutBorderColorVH, value: true },
                top: {
                    left: {
                        key: PropsConst.layoutBorderTopColor,
                        type: ItemConst.Type.Color,
                        value: "#fff",
                        handlePicker: PropsConst.widgetColorHandle
                    },
                    center: { key: PropsConst.layoutBorderColorVL },
                    right: {
                        key: PropsConst.layoutBorderBottomColor,
                        type: ItemConst.Type.Color,
                        value: "#fff",
                        handlePicker: PropsConst.widgetColorHandle
                    }
                },
                bottom: {
                    left: {
                        key: PropsConst.layoutBorderLeftColor,
                        type: ItemConst.Type.Color,
                        value: "#fff",
                        handlePicker: PropsConst.widgetColorHandle
                    },
                    center: { key: PropsConst.layoutBorderColorHL },
                    right: {
                        key: PropsConst.layoutBorderRightColor,
                        type: ItemConst.Type.Color,
                        value: "#fff",
                        handlePicker: PropsConst.widgetColorHandle
                    }
                }
            })
        ]
    },
    { type: Form.Const.Type.Line, top: 0, bottom: 8 }
];
