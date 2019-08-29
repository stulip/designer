/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-08-28 16:49
 */
import React, { PureComponent } from "react";
import "../assets/design.pcss";
import { Route } from "@xt-web/react-dom";
import {IBotIcon} from 'fr-web';
import {Toolbar} from "./Toolbar";
import {Screens} from "./Screens";
import {Footer} from "./Footer";
import {Rules} from "./Rules";
import { Widgets } from "./Widgets";

export class Main extends PureComponent {

    render() {
        return (
            <div id={'design'}>
                <div className={'ds-design'}>
                    <Toolbar/>
                    <div className={'ds-content'}>
                        <Screens/>
                        <Widgets/>
                        <div className={'panel-left'}>
                            left
                        </div>
                        <main className={'ds-viewport'}>
                            <section className={'art-board'}>
                                <div className={'prev-page float-btn dark'}>
                                    <IBotIcon type={'dora'} name={'arrow_up'}/>
                                    <span>返回工作区</span>
                                </div>
                                <div className={'prev-page float-btn'}>
                                    <span className={'dot'}/>
                                    <span>链接上一页</span>
                                </div>
                                <Rules />
                            </section>
                            <Footer/>
                        </main>
                        <div className={'panel-right'}>
                            right
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
