/**
 *
 * @author tangzehua
 * @since 2019-05-27 15:45
 */

import {Route} from '@xt-web/react-dom';

const routes = [
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
    // 避免热更新 重复加载
    if (process.env.NODE_ENV === 'development'){
        if (window._web_route_init) return;
        window._web_route_init = true;
    }
    Route.addLayout(require('../pages/test/test1').Layout, 'ds', 'es', 'erp');
    Route.addRoute('/', routes);
    Route.addRoute('ds', routes);
    Route.addRoute('es', routes);
    Route.set404Page(require('../pages/error')._404)
}
