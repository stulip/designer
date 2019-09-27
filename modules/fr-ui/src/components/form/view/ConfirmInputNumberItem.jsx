/**
 * 必填数字输入框
 * @author tangzehua
 * @sine 2019-09-27 11:23
 */

// @flow
import * as React from 'react';
import {classNames, IBotForm} from 'fr-web';
import {BaseItem} from "./../base/BaseItem";

type Props = {

};
type State = {

};

export class ConfirmInputNumberItem extends BaseItem<Props, State> {

    renderItem() {
        let that = this;
        let { item } = that.props;
        let {value = '', error, required} = that.state;
        let input = item.input || {};

        return (
            <>
                { item.title && <span className={classNames('left-label', {error: error})}>{item.title}</span>}
                <div className={'right-content'}>
                    <IBotForm.PanelInputNumber {...input} value={value} />
                </div>
            </>
        );
    };
}
