/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React, { PureComponent } from "react";
import { Route } from "@xt-web/react-dom";

export class Home extends PureComponent {
    gotoApp = () => {
        Route.push("/design");
    };

    gotoTest = ()=> {
        Route.push("/design/view");
    };

    gotoTest2 = () => {
        // Route.push("/design/about");
    };


    render() {
        return (
            <div className={"grid-background"}>
                <div className="playground" style={{ marginTop: 120 }}>
                    <h1>🌈 Web Designer</h1>
                    <div className={"home-mbtn"}>
                        <button className={"btn-designer"} onClick={this.gotoApp}>App Designer</button>
                        <button className={"btn-designer"} onClick={this.gotoTest}>测试页面</button>
                    </div>
                </div>
            </div>
        );
    }
}
