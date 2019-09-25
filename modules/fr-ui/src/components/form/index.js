import {FormView} from './FormView';
import {required} from './rules/Required';

import {SwitchItem} from "./view/SwitchItem";
import {DateItem} from "./view/DateItem";
import {SelectNormalItem} from "./view/SelectNormalItem";
import {TextItem} from "./view/TextItem";
import {InputMaterialItem} from './view/InputMaterialItem'
import {InputItem} from './view/InputItem'
import {SelectItem} from './view/SelectItem'
import {BaseItem} from './base/BaseItem';
import { BaseSelectItem } from "./base/BaseSelectItem";

//单选
FormView.registerComponent("select", {
    props: {single: true},
    defaultValue: Object.create(null),
    component: SelectItem
});

// 多选
FormView.registerComponent("selects", {
    props: {single: false},
    defaultValue: [],
    component: SelectItem
});

//简单的单选
FormView.registerComponent("select_normal", {
    defaultValue: Object.create(null),
    component: SelectNormalItem
});

// switch
FormView.registerComponent("switch", {
    defaultValue: false,
    component: SwitchItem,

});
// 日期
FormView.registerComponent("date", {component: DateItem});
// 多行输入
FormView.registerComponent("inputs", {props: {multiline: true}, component: InputItem});
// 输入框
FormView.registerComponent("input", {component: InputMaterialItem});
// 文本显示
FormView.registerComponent("text", {component: TextItem});


export {
    FormView,
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
