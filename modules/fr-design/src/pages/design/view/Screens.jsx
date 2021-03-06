/**
 * 设计视口
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 11:48
 */

import React from "react";
import "../assets/screens.pcss";
import {observer} from "mobx-react";
import {ScreensStore} from "../store/ScreensStore";
import {classNames} from "fr-web";
import {AdjustSizeCanvas, RangeSelection, SVG} from "fr-ui";
import {ViewGroup} from "./ViewGroup";
import {WidgetBorder} from "./WidgetBorder";
import sliderImage from 'fr-art/design/slider-arrow.png';

type Props = { store: ScreensStore };
type State = {};

@observer
export class Screens extends React.Component<Props, State> {
    componentDidMount(): * {
        const store = this.props.store;
        if (store.screensRef.current) {
            store.screensRef.current.addEventListener("mousewheel", store.main.section.handleWheel, { passive: false });
        }
        store.mount();
    }

    componentWillUnmount(): * {
        const store = this.props.store;
        if (store.screensRef.current) {
            store.screensRef.current.removeEventListener("mousewheel", store.main.section.handleWheel);
        }
        store.unmount();
    }

    renderBgArea() {
        let that = this;
        const store = that.props.store;
        const { main } = store;
        const { canvasScale, canvasRect } = main.section;
        const {width, height} = canvasRect;
        const {designRect, isApp} = main.config;

        const topHeight = designRect.top * canvasScale;
        const bottomHeight = designRect.bottom * canvasScale;
        return (
            <>
                {
                    isApp &&
                    <div className={"slider"}>
                        <span className="is-hh" style={{height: topHeight}}/>
                        <span className="is-fh" style={{height: bottomHeight}}/>
                        <div className="hh" style={{top: topHeight}}>
                            <img src={sliderImage}/>
                        </div>
                        <div className="fh" style={{bottom: bottomHeight}}>
                            <img src={sliderImage}/>
                        </div>
                    </div>
                }
                <AdjustSizeCanvas handleResize={store.handleCanvasResize} width={width} height={height}/>
            </>
        );
    }

    renderCanvas() {
        let that = this;
        const store = that.props.store;
        const { main, canvasRef } = store;
        const { width, height } = main.section.canvasRect;
        const { designRect } = main.config;
        return (
            <div
                id={"canvas"}
                ref={canvasRef}
                className={classNames("canvas portrait", designRect.type)}
                style={{ width, height, background: "none" }}
            >
                <ViewGroup store={main.viewGroup} />
            </div>
        );
    }

    renderToolArea() {
        let that = this;
        const store = that.props.store;
        const {main} = store;
        const {designRect} = main.config;
        const {canvasScale, canvasRect, gridAttribute} = main.section;
        const {width, height} = canvasRect;
        const scaleValue = parseInt(100 * canvasScale);
        const scaleWidth = width * canvasScale, scaleHeight = height * canvasScale;
        const borderRadius = designRect.radius * canvasScale;
        const clipPath = `inset(0 round ${borderRadius + 13}px`;
        const clipPath2 = `inset(0 round ${borderRadius}px`;
        return (
            <>
                <div className={"screen"} style={{width: scaleWidth, height: scaleHeight, clipPath}}/>
                <div className={"title-label"}>
                    <span>主页 - 默认状态</span>
                    <span>{scaleValue + "%"}</span>
                </div>
                <div className={"canvas-bg-area"} style={{width: scaleWidth, height: scaleHeight}}>
                    {that.renderBgArea()}
                </div>
                <div
                    className={classNames("bg-view", designRect.type)}
                    style={{height: scaleHeight, backgroundColor: main.editData.backgroundColor, clipPath: clipPath2}}
                >
                    {gridAttribute.visible && SVG.small_grid(gridAttribute.size, canvasScale)}
                </div>
            </>
        );
    }

    _render() {
        let that = this;
        const store = that.props.store;
        const {main: {section, config, viewGroup}, screenRef, screensRef} = store;
        const {canvasRect, canvasScale} = section;
        const {width, height} = canvasRect;
        const {designRect} = config;
        const transform = `matrix(1, 0, 0, 1, ${canvasRect.x}, ${canvasRect.y})`;
        const scaleValue = parseInt(100 * canvasScale);
        const position = (100 - scaleValue) / 2;
        const scaleStyle = {
            top: `${position}%`,
            left: `${position}%`,
            width: `${scaleValue}%`,
            height: `${scaleValue}%`
        };
        return (
            <div className={"screens"} ref={screensRef} onMouseDown={store.handleMouseDown}>
                <div
                    className={"viewport"}
                    style={{
                        width: designRect.width,
                        height: designRect.height,
                        minWidth: designRect.width,
                        minHeight: designRect.height,
                        transform
                    }}
                >
                    <div className={"no-zoom-area"} style={scaleStyle}>
                        {that.renderToolArea()}
                    </div>
                    <div className={"zoom-area"} style={{ transform: `scale(${canvasScale})` }}>
                        {that.renderCanvas()}
                    </div>
                    <div className={"no-zoom-area"} style={scaleStyle}>
                        {designRect.height < height && <div className="first-page-divider" />}

                        <div className={"fe-canvas"} style={{width: width * canvasScale, height: height * canvasScale}}>
                            <WidgetBorder hoveRect={viewGroup.hoveRect} selectRect={viewGroup.selectRect}
                                          hoverFill={viewGroup.hoverFill}/>
                        </div>
                    </div>
                </div>
                <RangeSelection rect={store.rangeBoundRect} handleRect={store.handleRangeBoundRect} />
            </div>
        );
    }

    render() {
        return this._render();
    }
}
