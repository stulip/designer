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
import { scrollbarThick } from "../config";

type Props = {
    store: SectionStore
};

@observer
export class Rules extends Component<Props> {
    state = {
        lines: {
            h: [-60, 435],
            v: [100, 650]
        }
    };

    handleLine = lines => {
        this.setState({ lines });
    };

    render() {
        const { lines } = this.state;
        const store = this.props.store;
        const { h, v } = lines;
        const {
            canvasScale,
            isShowRuler,
            isShowReferLine,
            main,
            rulerPosition,
            rulerSize,
            rulerShadow
        } = store;
        return (
            <Ruler
                thick={scrollbarThick}
                scale={canvasScale}
                width={rulerSize.width}
                height={rulerSize.height}
                startX={rulerPosition.x}
                startY={rulerPosition.y}
                shadow={rulerShadow}
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
