/**
 * 字体组件
 * @author tangzehua
 * @sine 2019-10-11 14:23
 */

// @flow
import React from 'react';
import type {BaseWidgetProps} from "./BaseWidget";
import '../assets/text.pcss'
import {Types} from "@xt-web/core";
import {BaseTextConfig} from "./base.text.config";
import {BasePanel} from "./BasePanel";
import {PropsConst, TextConst} from "../../config/Attribute";

export type BaseTextProps = {
    ...BaseWidgetProps

};

type State = {};

export class BaseText extends BasePanel<BaseTextProps, State> {

    getName(): string {
        return "文字";
    }

    getDefaultConfig(): {} {
        const that = this;
        const {children} = that.props;
        const spCfg = super.getDefaultConfig();

        if (Types.isString(children)) {
            spCfg[PropsConst.textValue] = children;
        }
        spCfg[PropsConst.textAlign] = TextConst.textAlign.left;
        return spCfg;
    }

    widgetProps(child: Array<Object> = []): Array<Object> {
        return super.widgetProps([...child, ...BaseTextConfig()]);
    }

    renderChild() {
        const that = this;
        const {widget: {text}} = that.styles;
        return (
            <div className={'rich-text'} style={text.css}>
                <span className={'text'}>{text.value}</span>
            </div>
        );
    };
}
