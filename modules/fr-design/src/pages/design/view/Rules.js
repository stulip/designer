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
        isShowRuler: true,
        isShowReferLine: true,
        lines: {
            h: [100, 400],
            v: [100, 300]
        }
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

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
    handleWheel = e => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const nextScale = parseFloat(Math.max(0.2, this.state.scale - e.deltaY / 500).toFixed(2));
            this.setState({ scale: nextScale });
        }
    };
    handleLine = lines => {
        this.setState({ lines });
    };

    handleShowReferLine = () => {
        this.setState({ isShowReferLine: !this.state.isShowReferLine });
    };

    handleShowRuler = () => {
        this.setState({ isShowRuler: !this.state.isShowRuler });
    };

    handleCornerClick = () => {
        console.log("Corner Click");
    };

    render() {
        const { scale, startX, startY, lines, isShowRuler, isShowReferLine } = this.state;
        const store = this.props.store;
        const { h, v } = lines;
        const {width, height} = store.size;
        return (
            <Ruler
                ref={rf=>this.ruler = rf}
                thick={thick}
                scale={scale}
                width={width}
                height={height}
                startX={startX}
                startY={startY}
                // shadow={shadow}
                horLineArr={h}
                verLineArr={v}
                isShowRuler={isShowRuler}
                isShowReferLine={isShowReferLine}
                handleLine={this.handleLine}
                handleShowRuler={this.handleShowRuler}
                handleShowReferLine={this.handleShowReferLine}
                cornerActive={true}
                onCornerClick={this.handleCornerClick}
            />
        );
    }
}
