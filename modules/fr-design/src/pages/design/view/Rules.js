/**
 * 设计器标尺
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 14:33
 */

import React, { Component } from "react";
import { Ruler } from "fr-web";
import {observer} from "mobx-react";
import {SectionStore} from "../store/SectionStore";

type Props = {
    store: SectionStore
}

const thick = 16;
@observer
export class Rules extends Component<Props> {
    state = {
        scale: 1, //658813476562495, //1,
        startX: -150,
        startY: -150,
        lines: {
            h: [100, 400],
            v: [100, 300]
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.scale !== prevState.scale) {
            this.handleScroll();
        }
    }

    handleScroll = () => {
        const screensRect = document.querySelector("#screens").getBoundingClientRect();
        const canvasRect = document.querySelector("#canvas").getBoundingClientRect();

        // 标尺开始的刻度
        const { scale } = this.state;
        const startX = (screensRect.left + thick - canvasRect.left) / scale;
        const startY = (screensRect.top + thick - canvasRect.top) / scale;
        this.setState({ startX, startY });
    };
    handleLine = lines => {
        this.setState({ lines });
    };

    render() {
        const { scale, startX, startY, lines } = this.state;
        const store = this.props.store;
        const { h, v } = lines;
        const {contentScale, contentSize, isShowRuler, isShowReferLine} = store;
        return (
            <Ruler
                thick={thick}
                scale={contentScale}
                width={contentSize.width}
                height={contentSize.height}
                startX={startX}
                startY={startY}
                // shadow={shadow}
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
