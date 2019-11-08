/**
 *
 * @author tangzehua
 * @sine 2019-11-07 13:48
 */
import {Async} from "@xt-web/core";

export default {
    App: Async(() => import ('./mobile')),
    Web: Async(() => import("./mobile"))
}
