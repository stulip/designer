/**
 * 属性配置
 * @author tangzehua
 * @sine 2019-09-24 16:17
 */

// 设计器事件常量
export const PropsConst = {
    canvasSize: "basic.canvas.size",
    background: "basic.background",
    designGrid: "basic.design.grid",

    //widget basic
    widgetName: "widget.name",
    widgetX: "widget.x",
    widgetY: "widget.y",
    widgetSize: "widget.size",
    widgetPosition: "widget.position",
    widgetBackground: "widget.background",
    widgetColorHandle: "widget.background.handle",

    // widget size
    widgetWidth: "widget.size.width",
    widgetHeight: "widget.size.height",
    widgetInitialWidth: "widget.initial.width",
    widgetInitialHeight: "widget.initial.height",

    // widget layout flex
    layoutDirection: "layout.flex.child.flexDirection",
    layoutJustifyContent: "layout.flex.child.justifyContent",
    layoutAlignContent: "layout.flex.child.alignContent",
    layoutAlignItems: "layout.flex.child.alignItems",
    layoutAlignSelf: "layout.flex.self.alignSelf",
    // 尺寸
    layoutFlexGrow: "layout.flex.self.flexGrow",
    layoutFlexShrink: "layout.flex.self.flexShrink",
    layoutFlexBasis: "layout.flex.self.flexBasis",

    // widget layout padding
    layoutPaddingVH: "layout.setting.padding.vh",
    layoutPaddingVL: "layout.setting.padding.vl",
    layoutPaddingHL: "layout.setting.padding.hl",
    layoutPaddingLeft: "layout.padding.paddingLeft",
    layoutPaddingRight: "layout.padding.paddingRight",
    layoutPaddingTop: "layout.padding.paddingTop",
    layoutPaddingBottom: "layout.padding.paddingBottom",

    // widget layout margin
    layoutMarginVH: "layout.setting.margin.vh",
    layoutMarginVL: "layout.setting.margin.vl",
    layoutMarginHL: "layout.setting.margin.hl",
    layoutMarginLeft: "layout.margin.marginLeft",
    layoutMarginRight: "layout.margin.marginRight",
    layoutMarginTop: "layout.margin.marginTop",
    layoutMarginBottom: "layout.margin.marginBottom",

    // widget layout border radius
    layoutRadiusVH: "layout.setting.radius.vh",
    layoutRadiusVL: "layout.setting.radius.vl",
    layoutRadiusHL: "layout.setting.radius.hl",
    layoutRadiusTopLeft: "layout.radius.borderTopLeftRadius",
    layoutRadiusTopRight: "layout.radius.borderTopRightRadius",
    layoutRadiusBottomLeft: "layout.radius.borderBottomLeftRadius",
    layoutRadiusBottomRight: "layout.radius.borderBottomRightRadius",

    // widget layout border
    layoutBorderVH: "layout.setting.border.vh",
    layoutBorderVL: "layout.setting.border.vl",
    layoutBorderHL: "layout.setting.border.hl",
    layoutBorderStyle: "layout.border.borderStyle",

    layoutBorderLeft: "layout.border.borderLeftWidth",
    layoutBorderRight: "layout.border.borderRightWidth",
    layoutBorderTop: "layout.border.borderTopWidth",
    layoutBorderBottom: "layout.border.borderBottomWidth",

    //widget layout border color
    layoutBorderColorVH: "layout.setting.border.color.vh",
    layoutBorderColorVL: "layout.setting.border.color.vl",
    layoutBorderColorHL: "layout.setting.border.color.hl",
    layoutBorderLeftColor: "layout.border.borderLeftColor",
    layoutBorderRightColor: "layout.border.borderRightColor",
    layoutBorderTopColor: "layout.border.borderTopColor",
    layoutBorderBottomColor: "layout.border.borderBottomColor",

    // widget text props
    textValue: "widget.text.value",
    textColor: "widget.text.css.color",
    // 'auto', 'left', 'right', 'center', 'justify'
    textAlign: "widget.text.css.textAlign",
    textSize: "widget.text.css.fontSize",
    textFontFamily: "widget.text.css.fontFamily",
    // 'normal', 'italic'
    textStyle: "widget.text.css.fontStyle",
    // normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'
    textWeight: "widget.text.css.fontWeight",
    textLineHeight: "widget.text.css.lineHeight",
    // 'none', 'underline', 'line-through', 'underline line-through'
    textDecorationLine: "widget.text.css.textDecorationLine",
    // {width: number,height: number}
    textShadowOffset: "widget.text.css.textShadowOffset",
    textShadowColor: "widget.text.css.textShadowColor", // string
    textShadowRadius: "widget.text.css.textShadowRadius", // number
    textIncludeFontPadding: "widget.text.css.includeFontPadding", //boolean
    // 'auto', 'top', 'bottom', 'center'
    textAlignVertical: "widget.text.css.textAlignVertical", // android
    textLetterSpacing: "widget.text.css.letterSpacing", // number iOS, Android >= 5.0
    // 'none', 'uppercase', 'lowercase', 'capitalize'
    textTransform: "widget.text.css.textTransform",

    // widget mouse
    widgetMouseExit: "widget.mouse.exit",
    widgetMouseEnter: "widget.mouse.enter",
    widgetMouseClick: "widget.mouse.click",
    widgetMouseDBLClick: "widget.mouse.dblclick"
};

export const TextConst = {
    textAlign: {
        auto: "auto",
        left: "left",
        right: "right",
        center: "center",
        justify: "justify",
    },
};

// 布局Layout常量
export const LayoutConst = {
    css: {
        normal: "normal"
    },
    direction: {
        row: "row",
        column: "column"
    },
    // flex-start', 'flex-end', 'center', 'stretch', 'baseline'
    alignItem: {
        center: "center",
        flexStart: "flex-start",
        flexEnd: "flex-end",
        stretch: "stretch", // app:default
        baseline: "baseline"
    },
    //'flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'
    alignContent: {
        flexStart: "flex-start",
        flexEnd: "flex-end",
        center: "center",
        stretch: "stretch",
        spaceBetween: "space-between",
        spaceAround: "space-around"
    },
    // 'auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'
    alignSelf: {
        auto: "auto",
        flexStart: "flex-start",
        flexEnd: "flex-end",
        center: "center",
        stretch: "stretch",
        baseline: "baseline"
    },
    // 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'
    justifyContent: {
        flexStart: "flex-start",
        flexEnd: "flex-end",
        center: "center",
        spaceEvenly: "space-evenly",
        spaceBetween: "space-between",
        spaceAround: "space-around"
    },
    // 'solid', 'dotted', 'dashed'
    borderStyle: {
        solid: "solid",
        dotted: "dotted",
        dashed: "dashed"
    }
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
    alignCenterH: 8
};

// 布局按钮配置
export const ArrangeConfig = [
    {
        type: ArrangeConst.evenlyH,
        icon: "design/dist_evenly_h",
        disable: true
    },
    {
        type: ArrangeConst.evenlyV,
        icon: "design/dist_evenly_v",
        disable: true
    },
    {
        type: ArrangeConst.alignLeft,
        icon: "design/align_left",
        disable: true
    },
    {
        type: ArrangeConst.alignCenterV,
        icon: "design/align_center_v",
        disable: true
    },
    {
        type: ArrangeConst.alignRight,
        icon: "design/align_right",
        disable: true
    },
    {
        type: ArrangeConst.alignTop,
        icon: "design/align_top",
        disable: true
    },
    {
        type: ArrangeConst.alignCenterH,
        icon: "design/align_center_h",
        disable: true
    },
    {
        type: ArrangeConst.alignBottom,
        icon: "design/align_bottom",
        disable: true
    }
];
