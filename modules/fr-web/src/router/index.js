/**
 *
 * @author tangzehua
 * @since 2019-05-27 15:45
 */
import {Route} from '@xt-web/react-dom';
import {AsyncComps} from '@xt-web/react'

const routes = [
    {
        path: '',
        component: AsyncComps(()=> import('../pages/home'))
    },
    {
        path: 'test',
        component: require('../pages/test/test1').test1,
        routes: [
            {
                path: '1',
                component: require('../pages/test/test1').test3,
                routes: [
                    {
                        path: '2',
                        component: require('../pages/test/test1').test4,
                    }
                ]
            }
        ]
    },
    {
        path: 'test1',
        component: require('../pages/test/test1').test2
    }
];


export function register (){
    Route.addRoute('/', routes);
    Route.set404Page(require('../pages/error')._404);
}
