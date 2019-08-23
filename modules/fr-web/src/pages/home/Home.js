/**
 *
 * @author tangzehua
 * @sine 2019-08-16 09:30
 */
import React, {PureComponent} from "react";
import {Route} from "@xt-web/react-dom";

export class Home extends PureComponent {

    gotoApp = ()=> {
        Route.push("/app");
    };

    render() {
        return (
            <div className={"grid-background"}>
                <div className="playground" style={{ marginTop: 120 }}>
                    <h1>🌈 Web Designer</h1>
                    <h3>
                        <button onClick={this.gotoApp}
                                style={{ width: 120, height: 26, backgroundColor: "#FF4081", color: "#fff" }}>
                            App Designer
                        </button>
                    </h3>
                </div>
            </div>
        )
    }
}
