/**
 *
 * @author tangzehua
 * @sine 2019-11-07 13:48
 */
import {Async} from "@xt-web/core";
import {AsyncComps} from "@xt-web/react";

export * from './config'
export const RootWidget = AsyncComps(() => import(/* webpackChunkName: "widget" */ "./base"), "RootWidget");

export default {
    App: () => Async(() => import (/* webpackChunkName: "widget_mobile" */ './mobile')),
    Web: () => Async(() => import (/* webpackChunkName: "widget_web" */ './web')),
}
