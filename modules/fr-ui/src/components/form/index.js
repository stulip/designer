import {FormView as View} from './FormView';
import {FormConst as Const} from './FormConst'

import {TextItem} from "./view/TextItem";
import {ConfirmInputNumberItem} from './view/ConfirmInputNumberItem'
import {BaseItem} from './base/BaseItem';
import { BaseSelectItem } from "./base/BaseSelectItem";
import {required} from './Required'
import {GapItem, LineItem} from "./view/LineItem";
import {PanelInputItem} from "./view/PanelInputItem";
import { SelectItem } from "./view/SelectItem";
import { IBotSelectItem } from "./view/IBotSelectItem";

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
View.registerComponent(Const.Type.PanelInput, {component: PanelInputItem});

//下拉框
View.registerComponent(Const.Type.Select, { component: SelectItem });
View.registerComponent(Const.Type.SelectIBot, { component: IBotSelectItem });

// 分隔线
View.registerComponent(Const.Type.Line, {component: LineItem});
View.registerComponent(Const.Type.Gap, {component: GapItem});


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
    SelectItem,
    required
}
