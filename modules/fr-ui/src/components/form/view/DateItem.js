/**
 * 日期选项
 * @flow
 * @author tangzehua
 * @sine 2018-12-28 14:02
 */
import React from 'react';
import {BaseItem} from "./../base/BaseItem";
import SelectMaterial from "../../../ui/SelectMaterial";
import sub_years from "date-fns/sub_years";
import is_after from "date-fns/is_after";
import {xt} from "fr-core";

class DateItem extends BaseItem {

    getValue(value){
        let that = this;
        let {date = {}} = that.props.item;
        let {format} = date;
        return xt.date.format(value, format);
    }

    onValueChange = (value) =>{
        let that = this;
        that.onChange(that.getValue(value));
    };

    onClick = () => {
        let that = this;
        let {value} = that.state;
        let {date = {}} = that.props.item;
        // 最大可选年份,和最新可选年份
        let {max = 99, min = 99} = date;

        let minimumDate = sub_years(new Date(), min), maximumDate = sub_years(new Date(), -max);
        value = value ? new Date(value) : is_after(maximumDate, new Date()) ? new Date(): maximumDate;
        xt.ui.showDatePicker({value, minimumDate, maximumDate, done: that.onValueChange});
    };

    renderItem() {
        let that = this;
        let {item,} = that.props;
        let {value = '', error, disabled, required} = that.state;

        return (
            <SelectMaterial
                error={error}
                must={required}
                title={item.title}
                disabled={disabled}
                onPress={that.onClick}
                subtitle={value}
            />
        )
    }
}

export {
    DateItem
}
