/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 11:36
 */
import React from "react";
import {classNames, IBotInput} from "fr-web";

import {BaseInputItem} from "../base/BaseInputItem";

class IBotInputItem extends BaseInputItem {
    renderItem() {
        let that = this;
        let {item} = that.props;
        let {value = "", error, disabled, required} = that.state;
        let input = item.input || {};
        const className = classNames("PanelInputNumber", input.className, {error});

        return (
            <div className={"right-content"}>
                <IBotInput
                    size={"small"}
                    {...input}
                    value={value}
                    onChange={that.onChange}
                    disabled={disabled}
                    className={className}
                />
            </div>
        );
    }
}

export {IBotInputItem};
