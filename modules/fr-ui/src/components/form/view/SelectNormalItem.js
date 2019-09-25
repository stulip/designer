/**
 * 简单的单选
 * @flow
 * @author tangzehua
 * @sine 2018-12-28 14:02
 */
import React from 'react';
import { BaseSelectItem } from "../base/BaseSelectItem";
import SelectMaterial from "../../../ui/SelectMaterial";
import {Api, TouchDelay, xt} from "fr-core";
import {Types} from '@xt-web/core'

class SelectNormalItem extends BaseSelectItem {

    isLoading: boolean = false;

    constructor (props){
        super(props);
        this.isLoading = false;
    }

    @TouchDelay
    onClick = async () => {
        let that = this;
        if (that.isLoading) return;
        let {value} = that.state;
        let {item, formData} = that.props;
        let {apiType = Api.get, host, uri, args, dataName = "data"} = item.api || {};

        if (!that.selectData.length && uri){
            that.isLoading = true;
            try {
                let res = await (apiType)(host, uri, Types.isFunction(args)? args(formData): args);
                that.selectData = xt.getItemValue(res, dataName, []);
            } catch (e) {
                return xt.ui.showEToast(e);
            }
            that.isLoading = false;
        }

        xt.ui.showSelectNormal(item.title, {
            labelKey: item.sub, value,
            sections: that.selectData,
            done: that.onChange
        })
    };

    getSubValue = () => {
        let that = this;
        let {value} = that.state;
        let {item} = that.props;
        return Array.isArray(value) ? value.map(da => that._getSubValue(da, item.sub)) : that._getSubValue(value, item.sub);
    };

    renderItem() {
        let that = this;
        let {item} = that.props;
        let {error, required, disabled}= that.state;
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
    SelectNormalItem
}
