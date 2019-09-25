/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 11:36
 */
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Text from "../../../ui/Text";
import { Colors, coreStyles } from "../../../styles";
import ReInput from "reinput";
import { BaseInputItem } from "../base/BaseInputItem";

class InputMaterialItem extends BaseInputItem {

    renderItem() {
        let that = this;
        let {item} = that.props;
        let {value = '', error, required, disabled} = that.state;
        let {input = {}} = item;
        let titleColor = error ? Colors.error : Colors.sub3Text;
        return (
            <View style={styles.container} key={"I"}>
                <Text style={[coreStyles.commonStar, !required && {color: '#fff'}, {paddingBottom: 4}]}>*</Text>
                <View style={{flex: 1, height: 48, marginTop: -10}}>
                    <ReInput
                        value={String(!xt.isEmpty(value) ? value : '')}
                        onChangeText={that.onChange}
                        onEndEditing={that.onEndEditing}
                        onFocus={that.onFocus}
                        labelActiveColor={'#000033'}
                        labelColor={titleColor}
                        paddingTop={0}
                        paddingBottom={0}
                        marginTop={0}
                        marginBottom={0}
                        fontSize={14}
                        underlineHeight={0}
                        underlineActiveHeight={0}
                        errorPaddingTop={0}
                        labelActiveTop={-14}
                        allowFontScaling={false}
                        label={item.title}
                        editable={!disabled}
                        {...input}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 48,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        // paddingVertical: 10,
        paddingBottom: 6,
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
        color: Colors.mainText
    }
});

export {
    InputMaterialItem
}
