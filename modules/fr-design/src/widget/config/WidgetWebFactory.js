/**
 *
 * @author tangzehua
 * @sine 2019-11-20 10:42
 */
import {randomId} from "../../config/Config";
import {WidgetConst} from './config'

const Web = WidgetConst.Web;

export class WidgetWebFactory {
    //面板
    static get [Web.Panel]() {
        return [{cid: randomId(), component: Web.Panel}];
    }

    // 文字
    static get [Web.Text]() {
        const widget = {
            cid: randomId(),
            component: Web.Text,
            children: "文本"
        };
        return [widget];
    }
}
