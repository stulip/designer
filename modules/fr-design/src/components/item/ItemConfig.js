

import {LayoutConst} from "../../config/Attribute";

/**
 *
 * @author tangzehua
 * @sine 2019-10-16 14:06
 */


export const Direction = {
    value: LayoutConst.direction.row,
    options: [
        {label: '横向', value: LayoutConst.direction.row},
        {label: '纵向', value: LayoutConst.direction.column}
    ]
};

export const JustifyContent = {
    value: undefined,
    options: [
        {label: 'center', value: LayoutConst.justifyContent.center},
        {label: 'flex-start', value: LayoutConst.justifyContent.flexStart},
        {label: 'flex-end', value: LayoutConst.justifyContent.flexEnd},
        {label: 'stretch', value: LayoutConst.justifyContent.stretch},
        {label: 'between', value: LayoutConst.justifyContent.spaceBetween},
        {label: 'around', value: LayoutConst.justifyContent.spaceAround},
    ]
};

export const AlignItems = {
    value: LayoutConst.alignItem.stretch,
    options: [
        {label: 'center', value: LayoutConst.alignItem.center},
        {label: 'flex-start', value: LayoutConst.alignItem.flexStart},
        {label: 'flex-end', value: LayoutConst.alignItem.flexEnd},
        {label: 'baseline', value: LayoutConst.alignItem.baseline},
        {label: 'stretch', value: LayoutConst.alignItem.stretch},
    ]
};

export const ItemConst = {
    Type: {
        Background: 'widget.background.0',
        GridSetting: 'widget.grid_setting.0',
        Header: "header.0",
    },
    Direction,
    JustifyContent,
    AlignItems
};
