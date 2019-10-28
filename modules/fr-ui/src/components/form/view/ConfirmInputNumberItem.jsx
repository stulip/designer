/**
 * 必填数字输入框
 * @author tangzehua
 * @sine 2019-09-27 11:23
 */

// @flow
import * as React from "react";
import {classNames, IBotForm} from "fr-web";
import {BaseItem} from "./../base/BaseItem";

type Props = {};
type State = {};

class PanelInputNumber extends IBotForm.ConfirmInputNumber {
    positionEverything() {
        setTimeout(() => {
            super.positionEverything();
        }, 0);
    }
}

export class ConfirmInputNumberItem extends BaseItem<Props, State> {
    renderItem() {
        let that = this;
        let {item} = that.props;
        let {value = "", error, disabled, required} = that.state;
        let input = item.input || {};
        const className = classNames("PanelInputNumber", input.className);

        return (
            <div className={"right-content"}>
                <PanelInputNumber
                    {...input}
                    className={className}
                    value={value}
                    onConfirm={that.onChange}
                    disabled={disabled}
                    size={"small"}
                />
            </div>
        );
    }
}
