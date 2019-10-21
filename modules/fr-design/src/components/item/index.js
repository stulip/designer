/**
 *
 * @author tangzehua
 * @sine 2019-09-29 14:17
 */

import {Form} from "fr-ui";
import {BackgroundItem} from "./view/BackgroundItem";
import {GridSettingItem} from "./view/GridSettingItem";
import {ItemConst} from './view/ItemConfig';
import {HeaderItem} from "./view/HeaderItem";
import './assets/item.pcss'
import {LockButtonItem} from "./view/LockButtonItem";
import {ColorItem} from "./view/ColorItem";

// 注册背景颜色组件
Form.View.registerComponent(ItemConst.Type.Background, {component: BackgroundItem});
// 网格设置
Form.View.registerComponent(ItemConst.Type.GridSetting, {component: GridSettingItem});
//Header
Form.View.registerComponent(ItemConst.Type.Header, {component: HeaderItem});
//Lock Button
Form.View.registerComponent(ItemConst.Type.LockIconButton, {component: LockButtonItem});
// Color
Form.View.registerComponent(ItemConst.Type.Color, {component: ColorItem});


export {
    ItemConst
}
