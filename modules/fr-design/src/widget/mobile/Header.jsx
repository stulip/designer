/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from "react";
import "../assets/mobile/header.pcss";
import type {BaseWidgetProps} from "../base";
import {Panel} from "./Panel";
import {LayoutConst, PropsConst} from "../../config/Attribute";
import {WidgetConst} from "../config";
import backImage from 'fr-art/design/back_chevron.png'

type Props = {
    ...BaseWidgetProps
};

export class Header extends Panel<Props> {
    static displayName = WidgetConst.App.Header;

    getDefaultName(): string {
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

    renderChild() {
        const that = this;
        const data = that.getFormData();
        const { widget: { children, center: centerWidget } = {} } = that.state;
        return (
            <>
                <div className={"header-left flex middle"}>
                    <img src={backImage} width={15}/>
                    <span className="text">返回</span>
                </div>
                {that.renderWidget([children])}

                <div className={"header-title"}>{that.renderWidget([centerWidget])}</div>
            </>
        );
    }
}
