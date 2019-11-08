/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 11:29
 */
import React from "react";
import {BaseSelectItem} from "../base/BaseSelectItem";
import {Types} from "@xt-web/core";
import {IBotSelect} from "fr-web";

class IBotSelectItem extends BaseSelectItem {
    static defaultProps = {
        single: true
    };

    onChange(data) {
        const {single} = this.props;
        super.onChange(!single && !Array.isArray(data) && !Types.isEmpty(data) ? [data] : data);
    }

    setValue(data) {
        const { single } = this.props;
        super.setValue(!single && !Array.isArray(data) && !Types.isEmpty(data) ? [data] : data);
    }

    renderItem() {
        let that = this;
        const { title, select = {}, titleDirection } = that.props.item;
        let { error, required, disabled, value } = that.state;

        return (
            <IBotSelect
                size={"small"}
                placeholder={""}
                {...select}
                optionList={that.selectData}
                value={value}
                disabled={disabled}
                onChange={that.onChange}
            />
        );
    }
}

export { IBotSelectItem };
