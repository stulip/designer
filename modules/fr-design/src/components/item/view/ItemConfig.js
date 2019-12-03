/**
 *
 * @author tangzehua
 * @sine 2019-10-16 14:06
 */

import {BehaviorConst, EventTypeConst, LayoutConst, PageTypeConst, TextConst} from "../../../config/Attribute";

// 布局方向
const Direction = {
    options: [
        {label: "横向", value: LayoutConst.direction.row},
        {label: "纵向", value: LayoutConst.direction.column}
    ]
};

// 布局之 justify content
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

// 布局之 align content
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

// 布局之 align items
const AlignItems = {
    options: [
        {label: "center", value: LayoutConst.alignItem.center},
        {label: "flex-start", value: LayoutConst.alignItem.flexStart},
        {label: "flex-end", value: LayoutConst.alignItem.flexEnd},
        {label: "baseline", value: LayoutConst.alignItem.baseline},
        {label: "stretch", value: LayoutConst.alignItem.stretch}
    ]
};

// 布局之 align self
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
// 边框
const BorderStyles = {
    options: [
        {label: "", value: ""},
        {label: "实线", value: LayoutConst.borderStyle.solid},
        {label: "虚线", value: LayoutConst.borderStyle.dashed},
        {label: "圆点", value: LayoutConst.borderStyle.dotted}
    ]
};

// 字体对齐方式
const TextAlign = {
    options: [
        {label: '左对齐', value: TextConst.textAlign.left},
        {label: '右对齐', value: TextConst.textAlign.right},
        {label: '居中', value: TextConst.textAlign.center},
        {label: 'justify', value: TextConst.textAlign.justify}
    ]
};

// 字体大小
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

// 字体权重(字体粗细)
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

// 事件 - 行为
const EventBehavior = {
    default: BehaviorConst.switchPage,
    options: [
        {label: "跳转页面", value: BehaviorConst.switchPage},
        {label: "切换状态", value: BehaviorConst.switchState},
        {label: "工作流", value: BehaviorConst.workFlow},
        {label: "存储值", value: BehaviorConst.variable},
    ]
};

// 事件类型
const EventType = {
    options: ({isApp}) => [
        {label: '点击', value: EventTypeConst.click},
        [
            "观察事件",
            {label: '值改变', value: EventTypeConst.watchWidgetVariable},
            {label: '状态改变', value: EventTypeConst.watchWidgetState},
            {label: '获得焦点', value: EventTypeConst.watchFocus},
            {label: '失去焦点', value: EventTypeConst.watchBlur},
        ],
        //App
        [
            "Touch事件",
            {label: '长按', value: EventTypeConst.touchLongPress},
            {label: '左滑', value: EventTypeConst.touchSlideLeft},
            {label: '右滑', value: EventTypeConst.touchSlideRight},
        ],
        // PC
        [
            "鼠标事件",
            {label: '双击', value: EventTypeConst.tapDBLClick},
            {label: '离开', value: EventTypeConst.tapMouseLeave},
            {label: '进入', value: EventTypeConst.tapMouseEnter},
        ],
        // 键盘事件
        [
            "键盘事件",
            {label: '按下', value: EventTypeConst.keyDown},
            {label: '释放', value: EventTypeConst.keyUp},
            {label: '按住', value: EventTypeConst.keyPress},
        ],
    ]
};

// 页面类型
const PageType = {
    default: PageTypeConst.tabs,
    options: ({isApp}) => [
        {label: '页签', value: PageTypeConst.tabs},
        {label: '弹出层', value: PageTypeConst.dialog},
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
    FontWeight,
    EventBehavior,
    EventType,
    PageType
};
