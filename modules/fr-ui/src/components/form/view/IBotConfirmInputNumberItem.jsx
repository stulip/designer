/**
 * 必填数字输入框
 * @author tangzehua
 * @sine 2019-09-27 11:23
 */

// @flow
import * as React from "react";
import {classNames, IBotConfirmInputNumber} from "fr-web";
import {BaseItem} from "./../base/BaseItem";

type Props = {};
type State = {};

class ConfirmInputNumber extends IBotConfirmInputNumber {

    componentDidMount() {
        this.positionThing();
    }

    positionThing() {
        const $label = this.$label;
        const _this$props4 = this.props,
            title = _this$props4.title,
            prefix = _this$props4.prefix;

        if (!title && !prefix) return;
        if (title) {
            const $input = $label.querySelector("input");
            const $title = $label.querySelector(".title");
            const $prefix = $label.querySelector(".prefix");
            const originalPaddingLeft = 4;// parseInt(getComputedStyle($input).getPropertyValue('padding-left'));

            const space = ($title ? $title.clientWidth + 6 : 0) + ($prefix ? $prefix.clientWidth : 0);
            setTimeout(function () {
                $input.style.paddingLeft = (space + originalPaddingLeft) + "px";
            }, 0);
        }
    }
}

export class IBotConfirmInputNumberItem extends BaseItem<Props, State> {
    renderItem() {
        let that = this;
        let {item} = that.props;
        let {value = "", error, disabled, required} = that.state;
        let input = item.input || {};
        const className = classNames("PanelInputNumber", input.className);

        return (
            <div className={"right-content"}>
                <ConfirmInputNumber
                    {...input}
                    className={className}
                    value={value}
                    onChange={that.onChange}
                    disabled={disabled}
                    size={"small"}
                />
            </div>
        );
    }
}
