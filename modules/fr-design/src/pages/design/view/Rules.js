/**
 * 设计器标尺
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 14:33
 */

import React, { Component } from "react";
import { Ruler } from "fr-web";
import { observer } from "mobx-react";
import { SectionStore } from "../store/SectionStore";
import {scrollbarThick} from "../config";

type Props = {
    store: SectionStore
};

@observer
export class Rules extends Component<Props> {
    state = {
        lines: {
            h: [100, 400],
            v: [100, 400]
        }
    };

    handleLine = lines => {
        this.setState({ lines });
    };

    render() {
        const {  lines } = this.state;
        const store = this.props.store;
        const { h, v } = lines;
        const { contentScale, contentSize, isShowRuler, isShowReferLine, main, rulerPosition } = store;
        const { screenSize } = main.config;
        const shadow = { x: 0, y: 0, width: screenSize.width, height: screenSize.height };
        console.log(rulerPosition.x, rulerPosition.y)
        return (
            <Ruler
                thick={scrollbarThick}
                scale={contentScale}
                width={contentSize.width}
                height={contentSize.height}
                startX={rulerPosition.x}
                startY={rulerPosition.y}
                shadow={shadow}
                horLineArr={h}
                verLineArr={v}
                isShowRuler={true}
                isShowReferLine={isShowReferLine}
                handleLine={this.handleLine}
                handleShowRuler={store.handleShowRuler}
                handleShowReferLine={store.handleShowReferLine}
                cornerActive={true}
                onCornerClick={store.handleCornerClick}
            />
        );
    }
}
