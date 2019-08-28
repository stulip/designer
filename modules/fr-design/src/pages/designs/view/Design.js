/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-08-28 16:49
 */
import React, { PureComponent } from "react";
import "../assets/design.pcss";
import { Route } from "@xt-web/react-dom";

export class Design extends PureComponent {

    render() {
        return (
            <div className={"design"}>
                <div>
                    <span>123</span>
                </div>
                <button className={"btn-designer"} onClick={() => Route.push("/")}>返回</button>
            </div>
        );
    }
}
