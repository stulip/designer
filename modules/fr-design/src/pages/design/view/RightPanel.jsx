/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:28
 */

import React from "react";
import {observer} from "mobx-react";
import {WidgetsStore} from "../store/WidgetsStore";
import {Exterior} from "./Exterior";

type Props = {
    store: WidgetsStore
};
type State = {};

@observer
export class RightPanel extends React.Component<Props, State> {

    render() {
        let that = this;
        let store = this.props.store;
        return (
            <div className={"panel-right"}>
                <div className={"content"}>
                    <Exterior store={store.main.attribute}/>
                </div>
            </div>
        );
    }
}
