/**
 *
 * @author tangzehua
 * @sine 2019-08-29 21:15
 */

// @flow
import * as React from "react";
import "../assets/widgets.pcss";
import { IBotIcon } from "fr-web";
import {observer} from "mobx-react";
import {WidgetsStore} from "../store/WidgetsStore";

type Props = {store: WidgetsStore};
type State = {};

@observer
export class Widgets extends React.Component<Props, State> {
    render() {
        let store = this.props.store;
        return (
            <div className={"ds-widgets-bar"}>
                <ul className={"basic"} id={"basic-widgets"}>
                    <li>
                        <IBotIcon name={"design"} type={"icon"}/>
                    </li>
                    <li>
                        <IBotIcon name={"apple"} type={"icon"}/>
                    </li>
                    <li>
                        <IBotIcon name={"windows"} type={"icon"}/>
                    </li>
                </ul>
                <a className={"toggle-area"}>
                    <IBotIcon name={"left_double_bracket"} type={"dora"}/>
                </a>
            </div>
        );
    };
};
