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
        component: AsyncComps(() => import(/* webpackChunkName: "design" */ "../pages/design"))
    },
    {
        path: 'view',
        component: AsyncComps(() => import(/* webpackChunkName: "design_home" */ '../pages/home'))
    },
];

export function register (){
    Route.addRoute('design', routes);
}
