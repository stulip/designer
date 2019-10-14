/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 11:36
 */
import React from 'react';
import {classNames, IBotForm} from 'fr-web';

import { BaseInputItem } from "../base/BaseInputItem";

class PanelInputItem extends BaseInputItem {

    renderItem () {
        let that = this;
        let {item} = that.props;
        let {value = '', error, disabled, required} = that.state;
        let input = item.input || {};

        return (
            <>
                { item.title && <span className={classNames('left-label', {error: error})}>{item.title}</span>}
                <div className={'right-content'}>
                    <IBotForm.PanelInput {...input} value={value} onChange={that.onChange} disabled={disabled}/>
                </div>
            </>
        )
    }
}

export {
    PanelInputItem
}
