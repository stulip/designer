import {FormView as View} from './FormView';

import {SwitchItem} from "./view/SwitchItem";
import {DateItem} from "./view/DateItem";
import {SelectNormalItem} from "./view/SelectNormalItem";
import {TextItem} from "./view/TextItem";
import {InputMaterialItem} from './view/InputMaterialItem'
import {InputItem} from './view/InputItem'
import {SelectItem} from './view/SelectItem'
import {BaseItem} from './base/BaseItem';
import { BaseSelectItem } from "./base/BaseSelectItem";
import {required} from './Required'

//单选
View.registerComponent("select", {
    props: {single: true},
    defaultValue: Object.create(null),
    component: SelectItem
});

// 多选
View.registerComponent("selects", {
    props: {single: false},
    defaultValue: [],
    component: SelectItem
});

//简单的单选
View.registerComponent("select_normal", {
    defaultValue: Object.create(null),
    component: SelectNormalItem
});

// switch
View.registerComponent("switch", {
    defaultValue: false,
    component: SwitchItem,

});
// 日期
View.registerComponent("date", {component: DateItem});
// 多行输入
View.registerComponent("inputs", {props: {multiline: true}, component: InputItem});
// 输入框
View.registerComponent("input", {component: InputMaterialItem});
// 文本显示
View.registerComponent("text", {component: TextItem});


export {
    View,
    DateItem,
    InputItem,
    InputMaterialItem,
    SelectItem,
    SelectNormalItem,
    SwitchItem,
    TextItem,
    BaseSelectItem,
    BaseItem,
    required
}
