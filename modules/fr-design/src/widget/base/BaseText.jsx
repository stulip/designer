/**
 * 字体组件
 * @author tangzehua
 * @sine 2019-10-11 14:23
 */

// @flow
import React from 'react';
import {BaseWidget} from "./BaseWidget";
import type {BaseWidgetProps} from "./BaseWidget";

export type BaseTextProps = {
    ...BaseWidgetProps

};

type State = {
    isSelect: boolean
};

export class BaseText extends BaseWidget<BaseTextProps, State> {


    renderWidget() {
        const {children} = this.props;
        return (
            <div>
                <p>
                    <span>{children}</span>
                </p>
            </div>
        );
    };
}
