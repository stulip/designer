/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React, { PureComponent } from "react";
import { Route } from "@xt-web/react-dom";

export class Home extends PureComponent {
    gotoApp = () => {
        Route.push("/app/designer");
    };

    render() {
        return (
            <div className={"grid-background fr-index"}>
                <div className="playground" style={{ marginTop: 120 }}>
                    <h1>🌈 Web Designer</h1>
                    <h3>
                        <button className={"app-btn-designer"} onClick={this.gotoApp}>App Designer</button>
                    </h3>
                </div>
            </div>
        );
    }
}
