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

class InputNumber extends IBotForm.InputNumber {

    componentDidMount() {
        const that = this;
        that.positionThing();
    }

    positionThing() {
        var $label = this.$label;
        var _this$props4 = this.props,
            title = _this$props4.title,
            prefix = _this$props4.prefix;

        if (!title && !prefix) return;
        if (title) {
            var $input = $label.querySelector("input");
            var $title = $label.querySelector(".title");
            var $prefix = $label.querySelector(".prefix");
            var originalPaddingLeft = 4;// parseInt(getComputedStyle($input).getPropertyValue('padding-left'));

            var space = ($title ? $title.clientWidth + 6 : 0) + ($prefix ? $prefix.clientWidth : 0);
            setTimeout(function() {
                $input.style.paddingLeft = (space + originalPaddingLeft) + "px";
            }, 0);
        }
    }
}

export class ConfirmInputNumberItem extends BaseItem<Props, State> {
    renderItem() {
        let that = this;
        let { item } = that.props;
        let { value = "", error, disabled, required } = that.state;
        let input = item.input || {};
        const className = classNames("PanelInputNumber", input.className);

        return (
            <div className={"right-content"}>
                <InputNumber
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
