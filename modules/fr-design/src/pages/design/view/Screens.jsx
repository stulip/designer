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
import {RangeSelection} from "../components/RangeSelection";
import {AdjustSizeCanvas} from "../components/AdjustSizeCanvas";
type Props = { store: ScreensStore };
type State = {};

const sliderImage = require("fr-art/design/slider-arrow.png");

@observer
export class Screens extends React.Component<Props, State> {

    componentDidMount(): * {
        const store = this.props.store;
        if (store.screensRef.current){
            store.screensRef.current.addEventListener('mousewheel', store.main.section.handleWheel, {passive: false});
        }
    }

    componentWillUnmount(): * {
        const store = this.props.store;
        if (store.screensRef.current){
            store.screensRef.current.removeEventListener('mousewheel', store.main.section.handleWheel);
        }
    }

    renderBgArea() {
        let that = this;
        const store = that.props.store;
        const { main } = store;
        const { canvasScale, canvasRect } = main.section;
        const { width, height } = canvasRect;

        const topHeight = 44 * canvasScale;
        const bottomHeight = 34 * canvasScale;
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
                <AdjustSizeCanvas handleResize={store.handleCanvasResize} width={width} height={height}/>
                <div className={"back-buttons"}>
                    <IBotTooltip content={"设置背景颜色"} position={"bottom"}>
                        <a
                            className={"sbgcolor"}
                            style={{ backgroundColor: main.pageConfig.backgroundColor }}
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
        const { main, canvasRef } = store;
        const { width, height } = main.section.canvasRect;
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
        const { main } = store;
        const { canvasScale, canvasRect } = main.section;
        const { width, height } = canvasRect;
        const scaleValue = parseInt(100 * canvasScale);
        const scaleWidth = width * canvasScale, scaleHeight = height * canvasScale;
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
                <div className={"bg-view"} style={{height: scaleHeight, backgroundColor: main.pageConfig.backgroundColor}}>
                    {small_grid(canvasScale)}
                </div>
            </>
        );
    }

    _render() {
        let that = this;
        const store = that.props.store;
        const { main, screenRef, screensRef} = store;
        const { canvasRect, canvasScale } = main.section;
        const { width, height } = canvasRect;
        const {deviceSize} = main.config;
        const transform = `matrix(1, 0, 0, 1, ${canvasRect.x}, ${canvasRect.y})`;
        const scaleValue = parseInt(100 * canvasScale);
        const position = (100 - scaleValue) / 2;
        const scaleStyle = { top: `${position}%`, left: `${position}%`, width: `${scaleValue}%`, height: `${scaleValue}%` };
        return (
            <div className={"screens"} ref={screensRef} onMouseDown={store.handleMouseDown}>
                <div className={"viewport"} style={{ width: deviceSize.width, height: deviceSize.height, minWidth: deviceSize.width, minHeight: deviceSize.height, transform }}>
                    <div className={"no-zoom-area"} style={scaleStyle}>
                        {that.renderToolArea()}
                    </div>
                    <div className={"zoom-area"} style={{ transform: `scale(${canvasScale})` }}>
                        {that.renderCanvas()}
                    </div>
                    <div className={"no-zoom-area"}  style={scaleStyle}>
                        {deviceSize.height < height && <div className="first-page-divider"/>}

                        <div className={"fe-canvas"}></div>
                    </div>
                </div>
                <RangeSelection rect={store.rangeBoundRect} handleRect={store.handleRangeBoundRect}/>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
