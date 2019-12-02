import {LayoutConst, TextConst} from "../../../config/Attribute";

/**
 *
 * @author tangzehua
 * @sine 2019-10-16 14:06
 */

const Direction = {
    options: [
        {label: "横向", value: LayoutConst.direction.row},
        {label: "纵向", value: LayoutConst.direction.column}
    ]
};

const JustifyContent = {
    options: [
        {label: "center", value: LayoutConst.justifyContent.center},
        {label: "flex-start", value: LayoutConst.justifyContent.flexStart},
        {label: "flex-end", value: LayoutConst.justifyContent.flexEnd},
        {label: "evenly", value: LayoutConst.justifyContent.evenly},
        {label: "between", value: LayoutConst.justifyContent.spaceBetween},
        {label: "around", value: LayoutConst.justifyContent.spaceAround}
    ]
};

const AlignContent = {
    options: [
        {label: "", value: undefined},
        {label: "center", value: LayoutConst.alignContent.center},
        {label: "flex-start", value: LayoutConst.alignContent.flexStart},
        {label: "flex-end", value: LayoutConst.alignContent.flexEnd},
        {label: "stretch", value: LayoutConst.alignContent.spaceEvenly},
        {label: "between", value: LayoutConst.alignContent.spaceBetween},
        {label: "around", value: LayoutConst.alignContent.spaceAround}
    ]
};

const AlignItems = {
    options: [
        {label: "center", value: LayoutConst.alignItem.center},
        {label: "flex-start", value: LayoutConst.alignItem.flexStart},
        {label: "flex-end", value: LayoutConst.alignItem.flexEnd},
        {label: "baseline", value: LayoutConst.alignItem.baseline},
        {label: "stretch", value: LayoutConst.alignItem.stretch}
    ]
};

const AlignSelf = {
    options: [
        {label: "auto", value: LayoutConst.alignSelf.auto},
        {label: "flex-start", value: LayoutConst.alignSelf.flexStart},
        {label: "flex-end", value: LayoutConst.alignSelf.flexEnd},
        {label: "center", value: LayoutConst.alignSelf.center},
        {label: "stretch", value: LayoutConst.alignSelf.stretch},
        {label: "baseline", value: LayoutConst.alignSelf.baseline}
    ]
};
const BorderStyles = {
    options: [
        {label: "", value: ""},
        {label: "实线", value: LayoutConst.borderStyle.solid},
        {label: "虚线", value: LayoutConst.borderStyle.dashed},
        {label: "圆点", value: LayoutConst.borderStyle.dotted}
    ]
};

const TextAlign = {
    options: [
        {label: '左对齐', value: TextConst.textAlign.left},
        {label: '右对齐', value: TextConst.textAlign.right},
        {label: '居中', value: TextConst.textAlign.center},
        {label: 'justify', value: TextConst.textAlign.justify}
    ]
};

const FontSize = {
    options: [
        {label: 12, value: 12},
        {label: 13, value: 13},
        {label: 14, value: 14},
        {label: 16, value: 16},
        {label: 17, value: 17},
        {label: 18, value: 18},
        {label: 20, value: 20},
        {label: 28, value: 28},
        {label: 36, value: 36},
        {label: 48, value: 48},
        {label: 72, value: 72},
    ]
};

const FontWeight = {
    options: [
        {label: "标准", value: TextConst.weight.normal},
        {label: "粗", value: TextConst.weight.bold},
        {label: "100", value: TextConst.weight['100']},
        {label: "200", value: TextConst.weight['200']},
        {label: "300", value: TextConst.weight['300']},
        {label: "400", value: TextConst.weight['400']},
        {label: "500", value: TextConst.weight['500']},
        {label: "600", value: TextConst.weight['600']},
        {label: "700", value: TextConst.weight['700']},
        {label: "800", value: TextConst.weight['800']},
        {label: "900", value: TextConst.weight['900']},
    ]
};

export const ItemConst = {
    Type: {
        Color: "widget.color.0",
        Background: "widget.background.0",
        GridSetting: "widget.grid_setting.0",
        Header: "widget.header.0",
        Button: "widget.button.0",
        LockIconButton: "widget.lock.button.1",
        IBotIcon: "widget.ibot.icon",
    },
    Direction,
    JustifyContent,
    AlignItems,
    AlignContent,
    AlignSelf,
    BorderStyles,
    TextAlign,
    FontSize,
    FontWeight
};
