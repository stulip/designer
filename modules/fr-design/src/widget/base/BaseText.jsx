/**
 * 字体组件
 * @author tangzehua
 * @sine 2019-10-11 14:23
 */

// @flow
import React from 'react';
import type {BaseWidgetProps} from "./BaseWidget";
import {BaseWidget} from "./BaseWidget";
import '../assets/text.pcss'
import {Form} from "fr-ui";
import {Types} from "@xt-web/core";

export type BaseTextProps = {
    ...BaseWidgetProps

};

type State = {
    isSelect: boolean
};

export class BaseText extends BaseWidget<BaseTextProps, State> {

    getName(): string {
        return "文字";
    }

    getDefaultConfig(): {} {
        const that = this;
        const {children} = that.props;
        const spCfg = super.getDefaultConfig();

        if (Types.isString(children)) {
            spCfg["text.value"] = children;
        }
        return spCfg;
    }

    widgetProps(): Array<Object> {
        const config = super.widgetProps();
        const {children} = this.props;

        return [
            ...config,
            {type: Form.Const.Type.Line, bottom: 8},
            {
                form: 'text.value',
                title: '内容',
                titleDirection: Form.Const.Direction.Top,
                type: Form.Const.Type.PanelInput,
            },
            {type: Form.Const.Type.Line, bottom: 8}
        ]
    }

    renderChild() {
        const that = this;
        const data = that.formData;
        return (
            <div className={'rich-text'}>
                <p>
                    <span className={'text'}>{data['text.value']}</span>
                </p>
            </div>
        );
    };
}
