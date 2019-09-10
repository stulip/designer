/**
 * 设计视口
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 11:48
 */

import React from "react";
import "../assets/screens.pcss";
import { observer } from "mobx-react";
import { ScreensStore } from "../store/ScreensStore";
import { IBotTooltip, IBotIcon } from "fr-web";
import { small_grid } from "./svg";
type Props = { store: ScreensStore };
type State = {};

const sliderImage = require("fr-art/design/slider-arrow.png");

@observer
export class Screens extends React.Component<Props, State> {
    renderBgArea() {
        let that = this;
        const store = that.props.store;
        const { main, pageConfig } = store;
        const { width, height } = main.config.screenSize;
        const { contentScale } = main.section;

        const topHeight = 44 * contentScale;
        const bottomHeight = 34 * contentScale;
        return (
            <>
                <div className={"slider"}>
                    <span className="is-hh" style={{ height: topHeight }} />
                    <span className="is-fh" style={{ height: bottomHeight }} />
                    <div className="hh" style={{ top: topHeight }}>
                        <img src={sliderImage} />
                    </div>
                    <div className="fh" style={{ bottom: bottomHeight }}>
                        <img src={sliderImage} />
                    </div>
                </div>
                <div className={"drag-resize"}>
                    <div className={"resize-y"}>
                        <span className="enlarge">
                            <IBotIcon name={"arrow_down"} type={"dora"} />
                        </span>
                        <span className="tip">拖动调节页面高度</span>
                        <span className="reduce">
                            <IBotIcon name={"arrow_up"} type={"dora"} />
                        </span>
                    </div>
                </div>
                <div className={"back-buttons"}>
                    <IBotTooltip content={"设置背景颜色"} position={"bottom"}>
                        <a
                            className={"sbgcolor"}
                            style={{ backgroundColor: pageConfig.backgroundColor }}
                            onClick={store.handleBackgroundColor}
                        />
                    </IBotTooltip>
                </div>
            </>
        );
    }

    renderCanvas() {
        let that = this;
        const store = that.props.store;
        const { main, canvasRef, pageConfig } = store;
        const { width, height } = main.config.screenSize;
        return (
            <div
                id={"canvas"}
                ref={canvasRef}
                className={"canvas ios iphone iphone_x portrait"}
                style={{ width, height, background: "none" }}
            >
                <div className={"group-list"}></div>
            </div>
        );
    }

    renderToolArea() {
        let that = this;
        const store = that.props.store;
        const { main, pageConfig } = store;
        const { width, height } = main.config.screenSize;
        const { contentScale } = main.section;
        const scaleValue = parseInt(100 * contentScale);
        const scaleWidth = width * contentScale, scaleHeight = height * contentScale;
        return (
            <>
                <div className={"screen"} style={{ width: scaleWidth, height:scaleHeight  }}>
                    <div className={"title-label"}>
                        <span>主页 - 默认状态</span>
                        <span>{scaleValue + "%"}</span>
                    </div>
                </div>
                <div className={"canvas-bg-area"} style={{ width: scaleWidth, height: scaleHeight }}>
                    {that.renderBgArea()}
                </div>
                <div className={"bg-view"} style={{height: scaleHeight, backgroundColor: pageConfig.backgroundColor}}>
                    {small_grid()}
                </div>
            </>
        );
    }

    _render() {
        let that = this;
        const store = that.props.store;
        const { main, screenRef, pageConfig } = store;
        const { contentPosition, handleWheel, contentScale } = main.section;
        const { width, height } = main.config.screenSize;
        const { x: cmx = 0, y: cmy = 0 } = contentPosition;
        const transform = `matrix(1, 0, 0, 1, ${cmx}, ${cmy})`;
        const scaleValue = parseInt(100 * contentScale);
        const position = (100 - scaleValue) / 2;
        const scaleStyle = { top: `${position}%`, left: `${position}%`, width: `${scaleValue}%`, height: `${scaleValue}%` };
        return (
            <div onWheel={handleWheel} className={"screens"}>
                <div className={"viewport"} style={{ width, height, minWidth: width, minHeight: height, transform }}>
                    <div className={"no-zoom-area"} style={scaleStyle}>
                        {that.renderToolArea()}
                    </div>
                    <div className={"zoom-area"} style={{ transform: `scale(${contentScale})` }}>
                        {that.renderCanvas()}
                    </div>
                    <div className={"no-zoom-area"}  style={scaleStyle}>
                        <div className="first-page-divider" />
                        <div className={"fe-canvas"}></div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
