/**
 *
 * @author tangzehua
 * @sine 2019-09-29 14:17
 */

import {Form} from "fr-ui";
import {BackgroundItem} from "./BackgroundItem";
import {GridSettingItem} from "./GridSettingItem";
import {ItemConst} from './ItemConfig';
import {HeaderItem} from "./HeaderItem";
import './assets/item.pcss'

// 注册背景颜色组件
Form.View.registerComponent(ItemConst.Type.Background, {component: BackgroundItem});
// 网格设置
Form.View.registerComponent(ItemConst.Type.GridSetting, {component: GridSettingItem});
//Header
Form.View.registerComponent(ItemConst.Type.Header, {component: HeaderItem});


export {
    ItemConst
}
