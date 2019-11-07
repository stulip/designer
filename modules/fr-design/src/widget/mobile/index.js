/**
 *
 * @author tangzehua
 * @sine 2019-10-10 15:02
 */
import {WidgetConst} from '../WidgetConfig'
import {Header} from './Header'
import {StatusBar} from './StatusBar'
import {BottomOperateBar} from './BottomOperateBar'
import {Text} from './Text'
import {Panel} from './Panel'

export default {
    [WidgetConst.App.StatusBar]: StatusBar,
    [WidgetConst.App.Header]: Header,
    [WidgetConst.App.BottomOperateBar]: BottomOperateBar,
    [WidgetConst.App.Text]: Text,
    [WidgetConst.App.Panel]: Panel,
};
