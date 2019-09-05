/**
 * 设计视口
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 11:48
 */

import React from "react";
import "../assets/screens.pcss";
import { SectionStore } from "../store/SectionStore";

type Props = { store: SectionStore };
type State = {};

export class Screens extends React.Component<Props, State> {
    _render() {
        const { main } = this.props.store;
        const section = main.section;
        const { width, height } = main.config.screenSize;

        const transform = `matrix(1, 0, 0, 1, 0, 0)`;
        return (
            <div id={"screens"} onWheel={section.handleWheel}>
                <div className={"viewport"} style={{ width, height, minWidth: width, minHeight: height, transform }}>
                    vp
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
