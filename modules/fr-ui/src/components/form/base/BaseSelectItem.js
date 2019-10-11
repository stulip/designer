/**
 * 选择插件
 * @flow
 * @author tangzehua
 * @sine 2019-02-27 10:19
 */
import React from 'react';
import {BaseItem} from "./BaseItem";

class BaseSelectItem extends BaseItem {
    // 可选择数据
    _selectData : Array<Object> = [];

    get selectData(): Array<Object> {
        let that = this;
        let {select = {}} = that.props.item;
        if (select.data && that._selectData !== select.data){
            this._selectData = select.data;
        }

        return this._selectData;
    }

    set selectData(value: Array<Object>) {
        this._selectData = value;
    }
}

export { BaseSelectItem };
