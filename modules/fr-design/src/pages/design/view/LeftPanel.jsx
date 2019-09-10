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
        const {leftPanelWidth, isToggle, leftPanelVXWidth} = this.props.store;
        return (
            <div className={`panel-left ${isToggle ? 'panel-left-size':''}`} style={{ width: leftPanelWidth }}>
                <div style={{width: leftPanelVXWidth}} className={'content'}>
                    左侧面板
                </div>
            </div>
        )
    }
    render() {
       return this._render();
    }
}
