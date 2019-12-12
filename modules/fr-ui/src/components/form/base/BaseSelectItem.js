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
    _selectData: Array<any> = [];
    _lastData: Array<any> = [];

    get selectData(): Array<Object> {
        let that = this;
        let {select = {}} = that.props.item;
        if (select.data && that._lastData !== select.data) {
            return that._lastData = select.data;
        }

        return this._selectData;
    }

    set selectData(value: Array<Object>) {
        const tmp = this._selectData;
        this._selectData = value;
        if (tmp !== value) {
            this.forceUpdate();
        }
    }
}

export { BaseSelectItem };
