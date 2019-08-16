/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React from 'react';
import {Route} from '@xt-web/react-dom'

export default function (props){
    return (
        <div>
            <button onClick={()=>Route.push("/test")}>调整到</button>
        </div>
    )
}

module.hot && module.hot.accept();
