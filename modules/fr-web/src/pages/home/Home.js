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
            <div>
                <div className="playground">
                    <h1>🌈 Web Designer Editor</h1>
                    <h3>
                        <button onClick={this.gotoApp}>
                            App Designer
                        </button>
                    </h3>
                </div>
            </div>
        )
    }
}
