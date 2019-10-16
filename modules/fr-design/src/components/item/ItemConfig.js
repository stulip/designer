import { LayoutConst } from "../../config/Attribute";

/**
 *
 * @author tangzehua
 * @sine 2019-10-16 14:06
 */

export const Direction = {
    value: LayoutConst.direction.row,
    options: [
        { label: "横向", value: LayoutConst.direction.row },
        { label: "纵向", value: LayoutConst.direction.column }
    ]
};

export const JustifyContent = {
    value: undefined,
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
    value: undefined,
    options: [
        { label: "center", value: LayoutConst.alignContent.center },
        { label: "flex-start", value: LayoutConst.alignContent.flexStart },
        { label: "flex-end", value: LayoutConst.alignContent.flexEnd },
        { label: "stretch", value: LayoutConst.alignContent.spaceEvenly },
        { label: "between", value: LayoutConst.alignContent.spaceBetween },
        { label: "around", value: LayoutConst.alignContent.spaceAround }
    ]
};

export const AlignItems = {
    value: LayoutConst.alignItem.stretch,
    options: [
        { label: "center", value: LayoutConst.alignItem.center },
        { label: "flex-start", value: LayoutConst.alignItem.flexStart },
        { label: "flex-end", value: LayoutConst.alignItem.flexEnd },
        { label: "baseline", value: LayoutConst.alignItem.baseline },
        { label: "stretch", value: LayoutConst.alignItem.stretch }
    ]
};

export const AlignSelf = {
    value: undefined,
    options: [
        { label: "auto", value: LayoutConst.alignSelf.auto },
        { label: "flex-start", value: LayoutConst.alignSelf.flexStart },
        { label: "flex-end", value: LayoutConst.alignSelf.flexEnd },
        { label: "center", value: LayoutConst.alignSelf.center },
        { label: "stretch", value: LayoutConst.alignSelf.stretch },
        { label: "baseline", value: LayoutConst.alignSelf.baseline }
    ]
};

export const ItemConst = {
    Type: {
        Background: "widget.background.0",
        GridSetting: "widget.grid_setting.0",
        Header: "header.0"
    },
    Direction,
    JustifyContent,
    AlignItems,
    AlignContent,
    AlignSelf
};
