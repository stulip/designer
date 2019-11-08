/**
 *
 * @author tangzehua
 * @sine 2019-11-07 13:48
 */
import {Async} from "@xt-web/core";

export default {
    App: Async(() => import (/* webpackChunkName: "widget_mobile" */ './mobile')),
    Web: Async(() => import (/* webpackChunkName: "widget_web" */ './mobile')),
}
