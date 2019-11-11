/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from "react";
import "../assets/mobile/header.pcss";
import type {BaseWidgetProps} from "../base/BaseWidget";
import {Panel} from "./Panel";
import {LayoutConst, PropsConst} from "../../config/Attribute";
import {WidgetConst} from "../WidgetConfig";

type Props = {
    ...BaseWidgetProps
};

const backImage = require("fr-art/design/back_chevron.png");

export class Header extends Panel<Props> {
    static displayName = WidgetConst.App.Header;

    getName(): string {
        return "导航栏";
    }

    getBackground(): string {
        return "#f8f8f8";
    }

    getBasicConfig() {
        const basic = super.getBasicConfig();
        basic.widgetWidth.disabled = true;
        return basic;
    }

    getDefaultConfig(): {} {
        const spCfg = super.getDefaultConfig();

        return {
            ...spCfg,
            [PropsConst.layoutAlignItems]: LayoutConst.alignItem.center,
            [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.spaceBetween
        };
    }

    getBoxRect(): { width: number, x: number, y: number, height: number } {
        const rect = super.getBoxRect();
        rect.height = WidgetConst.AppHeaderHeight;
        rect.width = WidgetConst.INITIAL;
        return rect;
    }

    addNewWidget(widgetId: string) {
        const that = this;
        const {widget: {right}} = that.state;
        const rightWidget = that.childrenRef.get(right[0]);
        rightWidget && rightWidget.addNewWidget(widgetId);
    }

    // widgetProps(): [] {
    //     const that = this;
    //     const config = super.widgetProps();
    //     return [
    //         ...config
    //     ];
    // }

    renderChild() {
        const that = this;
        const data = that.getFormData();
        const {widget: {right: rightWidget, center: centerWidget} = {}} = that.state;
        return (
            <>
                <div className={"header-left flex middle"}>
                    <img src={backImage} width={15}/>
                    <span className="text">返回</span>
                </div>
                {that.renderWidget(rightWidget)}

                <div className={"header-title"}>{that.renderWidget(centerWidget)}</div>
            </>
        );
    }
}
