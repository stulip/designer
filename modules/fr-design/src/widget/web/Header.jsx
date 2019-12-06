/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from "react";
import "../assets/pc/header.pcss";
import type {BaseWidgetProps} from "../base";
import {Panel} from "./Panel";
import {LayoutConst, PropsConst} from "../../config/Attribute";
import {WidgetConst} from "../config";
import NoohleIcon from '../assets/pc/noohle.png'

type Props = {
    ...BaseWidgetProps
};

export class Header extends Panel<Props> {
    static displayName = WidgetConst.Web.Header;

    getDefaultName(): string {
        return "页面头部";
    }

    getBackground(): string {
        return "#436393";
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

    renderChild() {
        const that = this;
        const data = that.getFormData();
        const {widget: {children, center: centerWidget} = {}} = that.state;
        return (
            <>
                <div className={"header-left flex middle"}>
                    <img src={NoohleIcon}/>
                </div>
                {that.renderWidget([children])}

                <div className={"header-title"}>{that.renderWidget([centerWidget])}</div>
            </>
        );
    }
}
