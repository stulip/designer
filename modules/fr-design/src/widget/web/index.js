/**
 *
 * @author tangzehua
 * @sine 2019-11-20 10:11
 */

import {Text} from './Text';
import {Panel} from './Panel';
import {Header} from './Header';
import {WidgetConst} from "../config";
import {DetailHeader} from "./DetailHeader";

const {Web} = WidgetConst;
export default {
    [Web.Text]: Text,
    [Web.Panel]: Panel,
    [Web.Header]: Header,
    [Web.DetailHeader]: DetailHeader,
}
