/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:29
 */

import React from "react";
import {WidgetsStore} from "../store/WidgetsStore";
import {observer} from "mobx-react";

type Props = { store: WidgetsStore };
type State = {};

@observer
export class LeftPanel extends React.Component<Props, State> {
    _render() {
        const {
            leftPanelWidth,
            isToggle,
            leftPanelVXWidth,
            switchPage,
            main: {
                config: {isApp}
            }
        } = this.props.store;
        const pages = isApp
            ? [
                {name: "客户关注产品", id: "007"},
                {name: "商品", id: "008"},
                {name: "信息收集", id: "009"}
            ]
            : [
                {name: "客户", id: "107"},
                {name: "产品", id: "108"},
                {name: "供应商", id: "109"}
            ];
        return (
            <div className={`panel-left ${isToggle ? "panel-left-size" : ""}`} style={{width: leftPanelWidth}}>
                <div style={{width: leftPanelVXWidth}} className={"content"}>
                    {pages.map(pg => (
                        <a key={pg.id} onClick={() => switchPage(pg.id)}>
                            {pg.name}
                        </a>
                    ))}
                </div>
            </div>
        );
    }
    render() {
        return this._render();
    }
}
