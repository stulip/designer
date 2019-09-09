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

type Props = { store: ScreensStore };
type State = {};

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
                    <div className={'no-zoom-area'}>
                        <div className={'screen'} ref={canvasRef}>
                            <div className={'title-label'}>
                                <span>主页 - 默认状态</span>
                                <span>{scaleValue + "%"}</span>
                            </div>
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
