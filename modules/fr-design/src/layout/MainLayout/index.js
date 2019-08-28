/**
 *
 * @author tangzehua
 * @sine 2019-08-27 11:14
 */
import React from 'react';
import {renderRoutes} from "react-router-config";

export default ({route}) =>  (
    <div className={'fr-app'}>
        {renderRoutes(route.routes)}
    </div>
)
