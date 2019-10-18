import { LayoutConst } from "../../config/Attribute";

/**
 *
 * @author tangzehua
 * @sine 2019-10-16 14:06
 */

export const Direction = {
    options: [
        { label: "横向", value: LayoutConst.direction.row },
        { label: "纵向", value: LayoutConst.direction.column }
    ]
};

export const JustifyContent = {
    options: [
        { label: "center", value: LayoutConst.justifyContent.center },
        { label: "flex-start", value: LayoutConst.justifyContent.flexStart },
        { label: "flex-end", value: LayoutConst.justifyContent.flexEnd },
        { label: "evenly", value: LayoutConst.justifyContent.evenly },
        { label: "between", value: LayoutConst.justifyContent.spaceBetween },
        { label: "around", value: LayoutConst.justifyContent.spaceAround }
    ]
};

export const AlignContent = {
    options: [
        { label: "", value: undefined },
        { label: "center", value: LayoutConst.alignContent.center },
        { label: "flex-start", value: LayoutConst.alignContent.flexStart },
        { label: "flex-end", value: LayoutConst.alignContent.flexEnd },
        { label: "stretch", value: LayoutConst.alignContent.spaceEvenly },
        { label: "between", value: LayoutConst.alignContent.spaceBetween },
        { label: "around", value: LayoutConst.alignContent.spaceAround }
    ]
};

export const AlignItems = {
    options: [
        { label: "center", value: LayoutConst.alignItem.center },
        { label: "flex-start", value: LayoutConst.alignItem.flexStart },
        { label: "flex-end", value: LayoutConst.alignItem.flexEnd },
        { label: "baseline", value: LayoutConst.alignItem.baseline },
        { label: "stretch", value: LayoutConst.alignItem.stretch }
    ]
};

export const AlignSelf = {
    options: [
        { label: "auto", value: LayoutConst.alignSelf.auto },
        { label: "flex-start", value: LayoutConst.alignSelf.flexStart },
        { label: "flex-end", value: LayoutConst.alignSelf.flexEnd },
        { label: "center", value: LayoutConst.alignSelf.center },
        { label: "stretch", value: LayoutConst.alignSelf.stretch },
        { label: "baseline", value: LayoutConst.alignSelf.baseline }
    ]
};
export const BorderStyles = {
    options: [
      { label: "", value: "" },
      { label: "实线", value: LayoutConst.borderStyle.solid },
      { label: "虚线", value: LayoutConst.borderStyle.dashed },
      { label: "圆点", value: LayoutConst.borderStyle.dotted }
    ]
};

export const ItemConst = {
    Type: {
        Color: "widget.color.0",
        Background: "widget.background.0",
        GridSetting: "widget.grid_setting.0",
        Header: "widget.header.0",
        Button: "widget.button.0",
        LockIconButton: "widget.button.1"
    },
    Direction,
    JustifyContent,
    AlignItems,
    AlignContent,
    AlignSelf,
    BorderStyles
};
