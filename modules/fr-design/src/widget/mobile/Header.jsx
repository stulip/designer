/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from "react";
import '../assets/mobile/header.pcss'
import type {BaseWidgetProps} from "../base/BaseWidget";
import {Form} from "fr-ui";
import {Panel} from './Panel'
import {LayoutConst, PropsConst} from "../../config/Attribute";
import {WidgetConst} from "../WidgetConfig";

type Props = {
    ...BaseWidgetProps,
};

const backImage = require('fr-art/design/back_chevron.png');

export class Header extends Panel<Props> {

    constructor(props) {
        super(props);
        this.rightConfig = {
            [PropsConst.layoutFlexGrow]: 0
        }
    }

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
            [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.spaceBetween,
        }
    }

    getBoxRect(): { width: number, x: number, y: number, height: number } {
        const rect = super.getBoxRect();
        rect.height = WidgetConst.App.HeaderHeight;
        rect.width = WidgetConst.INITIAL;
        return rect;
    }

    widgetProps(): [] {
        const that = this;
        const config = super.widgetProps();
        return [
            ...config,
            {
                form: 'header.title',
                title: '标题',
                type: Form.Const.Type.PanelInput,
            },
            {type: Form.Const.Type.Line, bottom: 8}
        ];
    }

    renderWidget(): * {
        const that = this;
        const data = that.formData;
        const {children} = that.props;
        return (
            <>
                <div className={'header-left flex middle'}>
                    <img src={backImage} width={15}/>
                    <span className="text">返回</span>
                </div>
                <Panel config={that.rightConfig}>{children}</Panel>
                <div className={'header-title'}>
                    <span className="text">{data['header.title']}</span>
                </div>
            </>
        )
    }
}
