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
        const {leftPanelWidth, isToggle, leftPanelVXWidth, switchPage} = this.props.store;
        return (
            <div className={`panel-left ${isToggle ? 'panel-left-size':''}`} style={{ width: leftPanelWidth }}>
                <div style={{width: leftPanelVXWidth}} className={'content'}>
                    <a onClick={() => switchPage("007")}>客户关注产品</a>
                    <a onClick={() => switchPage("008")}>科学材料</a>
                    <a onClick={() => switchPage("009")}>物料</a>
                </div>
            </div>
        )
    }
    render() {
       return this._render();
    }
}
