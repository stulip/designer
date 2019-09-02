/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-08-28 16:49
 */
import React, {PureComponent} from "react";
import "../assets/design.pcss";
import {Toolbar} from "./Toolbar";
import {Screens} from "./Screens";
import {Footer} from "./Footer";
import {Widgets} from "./Widgets";
import {RightPanel} from "./RightPanel";
import {LeftPanel} from "./LeftPanel";
import {SectionView} from "./SectionView";

export class Main extends PureComponent {

    renderContext (){
        let that = this;
        return (
            <div className={'ds-content'}>
                <Screens/>
                <Widgets/>
                <LeftPanel />
                <main className={'ds-viewport'}>
                    <SectionView />
                    <Footer/>
                </main>
                <RightPanel />
            </div>
        )
    }

    render() {
        let that = this;
        return (
            <div id={'design'}>
                <div className={'ds-design'}>
                    <Toolbar/>
                    {this.renderContext()}
                </div>
            </div>
        );
    }
}
