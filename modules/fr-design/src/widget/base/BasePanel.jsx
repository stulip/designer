/**
 * 面板
 * @author tangzehua
 * @sine 2019-10-12 10:19
 */

// @flow
import React from 'react';
import {BaseWidget} from "./BaseWidget";
import type {BaseWidgetProps} from "./BaseWidget";
import '../assets/panel.pcss'

export type BasePanelProps = {
    ...BaseWidgetProps
};

type State = {

};

export class BasePanel extends BaseWidget<BasePanelProps, State> {

    renderWidget () {
        const {children} = this.props;
        return (
            <div className={'view-panel'}>
                {children}
            </div>
        );
    };
}
