/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-08-28 16:49
 */
import React, { Component } from "react";
import "../assets/design.pcss";
import { Toolbar } from "./Toolbar";
import { Screens } from "./Screens";
import { Footer } from "./Footer";
import { Widgets } from "./Widgets";
import { RightPanel } from "./RightPanel";
import { LeftPanel } from "./LeftPanel";
import { SectionView } from "./SectionView";
import {observer} from "mobx-react";
import {MainStore} from "../store/MainStore";

@observer
export class Main extends Component {

    constructor(props) {
        super(props);
        this.store = new MainStore(props);
    }

    renderContext() {
        let that = this;
        return (
            <div className={"ds-content"}>
                <Screens />
                <Widgets />
                <LeftPanel />
                <main className={"ds-viewport"}>
                    <SectionView />
                    <Footer />
                </main>
                <RightPanel />
            </div>
        );
    }

    _render (){
        let that = this;
        return (
            <div id={"design"}>
                <div className={"ds-design"}>13
                    <Toolbar store={that.store}/>
                    {this.renderContext()}
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
