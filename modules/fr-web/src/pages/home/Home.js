/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React from 'react';
import {Route} from '@xt-web/react-dom'
import { hot } from 'react-hot-loader/root';

const Home = function (props){
    return (
        <div>
            <button onClick={()=>Route.push("/test")}>调整到123</button>
        </div>
    )
};

export default hot(Home);

// module.hot && module.hot.accept();


