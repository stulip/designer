/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 11:36
 */
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {BaseItem} from "./../base/BaseItem";
import Text from "../../../ui/Text";
import {Colors, coreStyles, mainStyles} from "../../../styles";
import {I18n} from "fr-locale";
import { BaseInputItem } from "../base/BaseInputItem";

class InputItem extends BaseInputItem {

    // 多行输入
    renderMultiline() {
        let that = this;
        let {item,} = that.props;
        let {value = '', error, disabled, required} = that.state;
        let {input = {}} = item;
        if (error) input.placeholderTextColor = Colors.error;
        let placeholder = required? I18n.t(230 /*请输入*/): I18n.t(632 /*选填*/);
        return (
            <View style={styles.columnView}>
                <View style={styles.columnTitle}>
                    <Text style={[coreStyles.commonStar, !required && {color: '#fff'}]}>*</Text>
                    <Text style={mainStyles.itemDistance}>{item.title}</Text>
                </View>
                <TextInput
                    placeholder={placeholder}
                    value={String(value || '')}
                    onChangeText={that.onChange}
                    onEndEditing={that.onEndEditing}
                    onFocus={that.onFocus}
                    autoCorrect={false}
                    maxLength={300}
                    allowFontScaling={false}
                    clearButtonMode="while-editing"
                    editable={!disabled}
                    style={[
                        styles.multiline,
                        error && {color: Colors.error}
                    ]}
                    {...input}
                    multiline
                />
            </View>
        )
    }

    renderLine() {
        let that = this;
        let {item} = that.props;
        let {value = '', error, disabled, required} = that.state;
        let {input = {}} = item;
        input.placeholderTextColor = error? Colors.error: Colors.sub3Text;
        let placeholder = required? I18n.t(230 /*请输入*/): I18n.t(632 /*选填*/);
        return (
            <View style={styles.container} key={"I"}>
                <Text style={[coreStyles.commonStar, !required && {color: '#fff'}]}>*</Text>
                <Text style={mainStyles.itemDistance}>{item.title}</Text>
                <TextInput
                    placeholder={placeholder}
                    value={String(value || '')}
                    onChangeText={that.onChange}
                    autoCorrect={false}
                    maxLength={300}
                    allowFontScaling={false}
                    editable={!disabled}
                    style={[
                        styles.edit_input,
                        {color: error ? Colors.error: Colors.mainText}
                    ]}
                    {...input}
                />
            </View>
        )
    }

    renderItem() {
        let that = this;
        let {multiline} = that.props;
        return multiline ? that.renderMultiline() : that.renderLine();
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },

    columnView: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingLeft: 16,
    },

    edit_input: {
        flex: 1,
        padding: 0,
        textAlign: 'right',
        fontSize: 14,
        height: 22,
    },

    columnTitle: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#C8C7CC',
        paddingBottom: 4,
    },

    multiline: {
        flex: 1,
        padding: 0,
        fontSize: 14,
        marginVertical: 4,
        paddingRight: 16,
        paddingLeft: 11,
        color: Colors.mainText
    }
});

export {
    InputItem
}
