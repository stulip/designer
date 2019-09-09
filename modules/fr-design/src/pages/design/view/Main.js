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
import { Section } from "./Section";
import {observer} from "mobx-react";
import {MainStore} from "../store/MainStore";

@observer
export class Main extends Component {

    constructor(props) {
        super(props);
        let that = this;
        that.store = new MainStore(props);
    }

    renderContext() {
        let store = this.store;
        return (
            <div className={"ds-content"}>
                <Screens store={store.screens}/>
                <Widgets store={store.widgets}/>
                <LeftPanel store={store.widgets}/>
                <main className={"ds-viewport"}>
                    <Section store={store.section}/>
                    <Footer store={store.footer}/>
                </main>
                <RightPanel store={store.widgets}/>
            </div>
        );
    }

    _render (){
        let store = this.store;
        return (
            <div id={"design"}>
                <div className={"ds-design"}>
                    <Toolbar store={store.toolbar}/>
                    {this.renderContext()}
                </div>
            </div>
        );
    }

    render (){
        return this._render();
    }
}
