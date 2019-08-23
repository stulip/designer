
/**
 * 起点
 */

import React, {Suspense} from 'react';
import { hot } from "react-hot-loader/root";
import {Router, Route} from '@xt-web/react-dom'
import {renderRoutes} from 'react-router-config'
import {register} from '../router';

const basename = process.env.NODE_ENV === 'production' ? '' : '';

const App = ()=> (
    <Router basename={basename}>
        {renderRoutes(Route.createRoute())}
    </Router>
);

register();
export default hot(App);
