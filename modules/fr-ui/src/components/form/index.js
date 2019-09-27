import {FormView as View} from './FormView';
import {FormConst as Const} from './FormConst'

import {TextItem} from "./view/TextItem";
import {ConfirmInputNumberItem} from './view/ConfirmInputNumberItem'
import {BaseItem} from './base/BaseItem';
import { BaseSelectItem } from "./base/BaseSelectItem";
import {required} from './Required'

//单选
// View.registerComponent("select", {
//     props: {single: true},
//     defaultValue: Object.create(null),
//     component: SelectItem
// });

// 多选
// View.registerComponent("selects", {
//     props: {single: false},
//     defaultValue: [],
//     component: SelectItem
// });

//简单的单选
// View.registerComponent("select_normal", {
//     defaultValue: Object.create(null),
//     component: SelectNormalItem
// });

// switch
// View.registerComponent("switch", {
//     defaultValue: false,
//     component: SwitchItem,
//
// });
// 日期
// View.registerComponent("date", {component: DateItem});
// 多行输入
// View.registerComponent("inputs", {props: {multiline: true}, component: InputItem});
// 输入框

// 文本显示
View.registerComponent(Const.Type.Text, {component: TextItem});

//输入框
View.registerComponent(Const.Type.ConfirmInputNumber, {component: ConfirmInputNumberItem});


export {
    View,
    Const,
    // DateItem,
    // InputItem,
    // SelectItem,
    // SelectNormalItem,
    // SwitchItem,
    ConfirmInputNumberItem,
    TextItem,
    BaseSelectItem,
    BaseItem,
    required
}
