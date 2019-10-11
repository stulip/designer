/**
 * Switch
 * @flow
 * @author tangzehua
 * @sine 2018-12-28 13:43
 */
import React from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import Text from "../../../ui/Text";
import {BaseItem} from "./../base/BaseItem";
import {coreStyles, mainStyles} from "../../../styles";

class SwitchItem extends BaseItem {

    renderItem (){
        let that = this;
        let {item} = that.props;
        let { value = false, required, disabled } = that.state;

        return (
            <View style={styles.container}>
                <Text style={[coreStyles.commonStar, !required && {color: '#fff'}]}>*</Text>
                <Text style={mainStyles.itemDistance}>{item.title}</Text>
                <View style={{flex: 1}}/>
                <Switch value={value} disabled={disabled} onValueChange={that.onChange} {...(item.switch || {})}/>
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
        height: 48,
    },
});

export {
    SwitchItem
}
