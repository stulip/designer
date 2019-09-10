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
import {IBotTooltip} from 'fr-web';

type Props = { store: ScreensStore };
type State = {};

const sliderImage = require('fr-art/design/slider-arrow.png');

@observer
export class Screens extends React.Component<Props, State> {
    _render() {
        const { main, canvasRef } = this.props.store;
        const {contentPosition, handleWheel, contentScale} = main.section;
        const { width, height } = main.config.screenSize;
        const {x: cmx = 0, y: cmy = 0} = contentPosition;
        const transform = `matrix(1, 0, 0, 1, ${cmx}, ${cmy})`;
        const scaleValue = parseInt(100 * contentScale);

        return (
            <div onWheel={handleWheel} className={'screens'}>
                <div className={"viewport"} style={{ width, height, minWidth: width, minHeight: height, transform }}>
                    <div className={'no-zoom-area'} style={{top: "0%", left: '0%', width: '100%', height: '100%'}}>
                        <div className={'screen'} ref={canvasRef} style={{width, height}}>
                            <div className={'title-label'}>
                                <span>主页 - 默认状态</span>
                                <span>{scaleValue + "%"}</span>
                            </div>
                        </div>
                        <div className={'canvas-bg-area'} style={{width, height}}>
                            <div className={'slider'}>
                                <span className="is-hh" style={{height: "44px"}}/>
                                <span className="is-fh" style={{height: "34px"}}/>
                                <div className="hh" style={{top: "44px"}}>
                                    <img src={sliderImage}/>
                                </div>
                                <div className="fh" style={{bottom: "34px"}}>
                                    <img src={sliderImage}/>
                                </div>
                            </div>
                        </div>
                        <div className={'footer'}>
                            <IBotTooltip content={'设置背景颜色'} position={'bottom'}>
                                <a className={'sbgcolor'} style={{backgroundColor:"#fff"}}/>
                            </IBotTooltip>
                        </div>
                    </div>
                    <div className={'zoom-area'} style={{transform: `scale(${contentScale})`}}>123</div>
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
