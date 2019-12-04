/**
 *
 * @author tangzehua
 * @since 2019-05-27 15:45
 */
import {Route} from '@xt-web/react-dom';
import {AsyncComps} from '@xt-web/react'

const routes = [
    {
        path: "app",
        component: AsyncComps(() => import(/* webpackChunkName: "preview-app" */ "../pages/app"))
    },
    {
        path: 'web',
        component: AsyncComps(() => import(/* webpackChunkName: "preview-web" */ '../pages/web'))
    },
];

export function register() {
    Route.addRoute('preview', routes);
}
