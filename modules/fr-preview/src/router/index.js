/**
 *
 * @author tangzehua
 * @since 2019-05-27 15:45
 */
import {Route} from '@xt-web/react-dom';
import {AsyncComps} from '@xt-web/react'

const routes = [
    {
        path: ":name(app|web)/:id",
        component: AsyncComps(() => import(/* webpackChunkName: "preview-app" */ "../pages/home"))
    },
];

export function register() {
    Route.addRoute('preview', routes);
}
