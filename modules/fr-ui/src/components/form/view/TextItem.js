/**
 * 文本显示
 * @flow
 * @author tangzehua
 * @sine 2018-12-28 13:43
 */
import React from 'react';
import {BaseItem} from "./../base/BaseItem";
import {Types} from "@xt-web/core";
import {classNames} from 'fr-web'

class TextItem extends BaseItem {

    renderItem (){
        let that = this;
        let {item} = that.props;
        let {value = '', error, required} = that.state;
        let text = item.text || {};
        value = Types.isObject(value)
            ? that._getSubValue(value, item.sub)
            : (Types.isBoolean(value)? (value ?"是" : "否"): value);

        return (
            <>
                <span className={classNames('left-label', {error: error})}>{item.title}</span>
                <div className={'right-content'}>
                    {text.render ? text.render(value, text): <span className={'value'} { ...text}>{value}</span>}
                </div>
            </>
        )
    }
}

export {
    TextItem
}
