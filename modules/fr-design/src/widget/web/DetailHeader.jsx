/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from "react";
import "../assets/pc/detail-header.pcss";
import type {BaseWidgetProps} from "../base";
import {Panel} from "./Panel";
import {PropsConst} from "../../config/Attribute";
import {WidgetConst} from "../config";

type Props = {
    ...BaseWidgetProps
};

export class DetailHeader extends Panel<Props> {
    static displayName = WidgetConst.Web.DetailHeader;

    getDefaultName(): string {
        return "详情页面头部";
    }

    getBackground(): string {
        return "#fff";
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
            [PropsConst.layoutFlexGrow]: '',
        };
    }

    renderChild() {
        const that = this;
        const data = that.getFormData();
        const {widget: {children} = {}} = that.state;
        return (
            <>
                <div className={"detail-header-left"}>
                    <div/>
                </div>
                {that.renderWidget([children])}
            </>
        );
    }
}
