/**
 * Switch
 * @flow
 * @author tangzehua
 * @sine 2018-12-28 13:43
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from "../../../ui/Text";
import {BaseItem} from "./../base/BaseItem";
import {Colors, coreStyles} from "../../../styles";
import {I18n} from "fr-locale";

class TextItem extends BaseItem {

    renderItem (){
        let that = this;
        let {item} = that.props;
        let {value = '', error, required} = that.state;
        let text = item.text || {};
        value = xt.isObject(value)
            ? that._getSubValue(value, item.sub)
            : (xt.isBoolean(value)? (value ?I18n.t(327 /*是*/) : I18n.t(482 /*否*/)): value);
        let titleColor = error ? Colors.error : (value? Colors.sub1Text: null);
        return (
            <View style={styles.container}>
                <Text style={[coreStyles.commonStar, !required && {color: '#fff'}]}>*</Text>
                <View>
                    <Text style={styles.itemDistance} color={titleColor} fontSize={value? 11: 14}>{item.title}</Text>
                    {text.render ? text.render(value, text): <Text style={styles.textValue} { ...text}>{value}</Text>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 6,
        minHeight: 50,
    },

    itemDistance:{
        paddingRight: 10,
        minWidth: 80,
        //width: 100,
        lineHeight:20,

    },

    textValue: {
        textAlign: 'left',
        flex: 1,
    }
});

export {
    TextItem
}
