/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:29
 */

import React from "react";
import {WidgetsStore} from "../store/WidgetsStore";
import {observer} from "mobx-react";

type Props = {store: WidgetsStore};
type State = {};

@observer
export class LeftPanel extends React.Component<Props, State> {

    _render (){
        const store = this.props.store;
        const leftWidth = !store.isToggle ? 240: 0;
        return (
            <div className={"panel-left "} style={{ width: leftWidth }}></div>
        )
    }
    render() {
       return this._render();
    }
}
