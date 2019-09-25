/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 11:29
 */
import React from 'react';
import { I18n } from "fr-locale";
import {Actions} from "react-native-router-flux";
import SelectMaterial from "../../../ui/SelectMaterial";
import {TouchDelay} from "fr-core";
import { BaseSelectItem } from "../base/BaseSelectItem";
import {Types} from '@xt-web/core';

class SelectItem extends BaseSelectItem {

    static defaultProps = {
        single: false,
    };

    onChange(data) {
        const { single } = this.props;
        super.onChange(!single && !Array.isArray(data) && !Types.isEmpty(data) ? [data] : data);
    }

    setValue(data) {
        const { single } = this.props;
        super.setValue(!single && !Array.isArray(data) && !Types.isEmpty(data) ? [data] : data);
    }

    @TouchDelay
    onClick = () => {
        let that = this;

        let {value} = that.state;
        let {item, single, formData, config} = that.props;
        let {select = {}} = item;
        let {args, ...api} = item.api || {};
        const { uniqueKey = "id", search, singleArgs, renderItem, labelKeys = [] } = select;
        if (item.api){
            api.args = Types.isFunction(args) ? args(formData) : args;
            api.uniqueKey = uniqueKey;
        }
        Actions.push("listSelect", {
            title: item.title,
            labelKey: labelKeys[0] || item.sub,
            subKey: labelKeys[1],
            search: !!search,
            singleArgs: singleArgs,
            renderItem: renderItem,
            selectArgs: {
                uniqueKey: uniqueKey,
                single: single,
                options: that.selectData,
                data: !that.isEmptyValue() ? value: null,
                done: that.onChange
            },
            pagingArgs: item.api ? api: null
        });
    };

    isEmptyValue (){
        let value = this.getSubValue();
        return xt.isBlank(Array.isArray(value)? value.join(''): value);
    }

    getSubValue = () => {
        let that = this;
        let {value} = that.state;
        let {item} = that.props;
        return Array.isArray(value) ? value.map(da => that._getSubValue(da, item.sub)) : that._getSubValue(value, item.sub);
    };

    renderItem() {
        let that = this;
        let {item} = that.props;
        let {error, required, disabled} = that.state;
        return (
            <SelectMaterial
                error={error}
                must={required}
                title={item.title}
                disabled={disabled}
                onPress={that.onClick}
                subtitle={that.getSubValue()}
            />
        )
    }
}

export {
    SelectItem
}
