/**
 * 属性配置
 * @author tangzehua
 * @sine 2019-09-24 16:17
 */

export const EventConst = {
    canvasSize: "attr.canvas.size",
    background: "attr.background",

    widgetMouseExit: "widget.mouse.exit",
    widgetMouseEnter: "widget.mouse.enter",
    widgetMouseClick: "widget.mouse.click",
    widgetMouseDBLClick: "widget.mouse.dblclick",
};

// 布局方向常量
export const ArrangeConst = {
    alignTop: 1,
    alignRight: 2,
    alignBottom: 3,
    alignLeft: 4,
    evenlyH: 5,
    evenlyV: 6,
    alignCenterV: 7,
    alignCenterH: 8,
};

// 布局按钮配置
export const ArrangeConfig = [
    {
        type: ArrangeConst.evenlyH,
        icon: 'design/dist_evenly_h',
        disable: true,
    },
    {
        type: ArrangeConst.evenlyV,
        icon: 'design/dist_evenly_v',
        disable: true,
    },
    {
        type: ArrangeConst.alignLeft,
        icon: 'design/align_left',
    },
    {
        type: ArrangeConst.alignCenterV,
        icon: 'design/align_center_v',
    },
    {
        type: ArrangeConst.alignRight,
        icon: 'design/align_right',
    },
    {
        type: ArrangeConst.alignTop,
        icon: 'design/align_top',
    },
    {
        type: ArrangeConst.alignCenterH,
        icon: 'design/align_center_h',
    },
    {
        type: ArrangeConst.alignBottom,
        icon: 'design/align_bottom',
    },

];
