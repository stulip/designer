/**
 *
 * @author tangzehua
 * @since 2019-05-27 15:45
 */
import {Route} from '@xt-web/react-dom';
import {AsyncComps} from '@xt-web/react'

const routes = [
    {
        path: "",
        component: AsyncComps(() => import("../pages/designs"))
    },
    {
        path: 'view',
        component: AsyncComps(()=> import('../pages/home'))
    },
];

export function register (){
    Route.addRoute('design', routes);
}
