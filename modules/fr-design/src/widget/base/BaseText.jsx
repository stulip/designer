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
        const {children} = that.state;
        const spCfg = super.getDefaultConfig();

        if (Types.isString(children) && Types.isEmpty(spCfg[PropsConst.textValue])) {
            spCfg[PropsConst.textValue] = children;
        }
        spCfg[PropsConst.textAlign] = TextConst.textAlign.left;
        spCfg[PropsConst.textWeight] = TextConst.weight.normal;
        spCfg[PropsConst.textLineHeight] = 16;
        spCfg[PropsConst.textSize] = 12;
        spCfg[PropsConst.textLetterSpacing] = 0;
        return spCfg;
    }

    widgetProps(child: Array<Object> = []): Array<Object> {
        return super.widgetProps([...child, ...BaseTextConfig()]);
    }

    // 默认不可添加子组件
    addNewWidget(widgetId: string) {
        return false;
    }

    renderChild() {
        const that = this;
        const {widget: {text}} = that.styles;
        const textStyle = text.css || {};
        textStyle.fontSize = parseInt(textStyle.fontSize);
        textStyle.lineHeight = `${textStyle.lineHeight}px`;
        return (
            <div className={'rich-text'} style={textStyle}>
                <span className={'text'}>{text.value}</span>
            </div>
        );
    };
}
