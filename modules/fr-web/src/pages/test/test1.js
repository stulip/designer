/**
 *
 * @author tangezhua
 * @since 2019-05-28 11:35
 */
import React from 'react';
import {renderRoutes} from 'react-router-config'
import {Route} from "@xt-web/react-dom";

export const Layout = (props)=> {

    return (
        <div>
            <header><h2>Layout Header</h2></header>
            {renderRoutes(props.route.routes)}
        </div>
    )
};


export const test1 = (props)=> {
    return (
        <div>
            <span>test1</span>
            <button onClick={()=>Route.push("/home")}>调整到Home</button>
            {renderRoutes(props.route.routes)}
        </div>
    )
};

export const test2 = ()=> (
    <div>
        <div>test2</div>
        <button onClick={()=>Route.push("/test")}>调整到</button>
    </div>
);


export const test3 = (props)=> {
    return (
        <div>
            <span>test3 测试1</span>
            {renderRoutes(props.route.routes)}
        </div>
    )
};

export const test4 = ()=> (
    <div>test4</div>
);
