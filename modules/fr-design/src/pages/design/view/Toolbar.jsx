/**
 * 设计器工具栏
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 10:07
 */

import * as React from 'react';

import '../assets/toolbar.pcss'
import {Route} from "@xt-web/react-dom";
import {IBotIcon, IBotSVG} from 'fr-web';
import {ToolbarStore} from "../store/ToolbarStore";
import {observer} from "mobx-react";
import {ENUM} from '../../../config/Config'

type Props = {
    store: ToolbarStore
};
type State = {

};

const ZoomItem = ({handleZoom, value, showToolbar})=> (
    <div>
        <div className={'zoom'}>
            <a onClick={()=> handleZoom(ENUM.ZOOM_M)} className={showToolbar ? 'icon': 'icon_line'}>
                <IBotSVG name={'minus'} />
            </a>
            <a className={'icons'} onDoubleClick={()=> handleZoom(0)}>
                <div className={'wrapper'}>
                    <span className={'scale-text'}>{value}%</span>
                </div>
                { showToolbar && <span>缩放</span> }
            </a>
            <a onClick={()=> handleZoom(ENUM.ZOOM_P)}  className={showToolbar ? 'icon': 'icon_line'}>
                <IBotSVG name={'plus'}/>
            </a>
        </div>
    </div>
);

@observer
export class Toolbar extends React.Component<Props, State> {

    componentDidMount() {
        this.props.store.mount();
    }

    componentWillUnmount() {
        this.props.store.unmount();
    }

    _render(){
        let that = this;
        const store = that.props.store;
        const {isApp} = store.main.config;
        const {canvasScale} = store.main.section;
        const { showToolbar } = store;
        const scaleValue = parseInt(100 * canvasScale);
        return (
            <div className={'ds-toolbar'}>
                <div className={'left'}>
                    <IBotIcon className={'back'} type={'mb'} name={'mobile-back'} onClick={() => Route.push("/")}/>
                    <span className={'title'}>{isApp? "App": "Web"} Design</span>
                </div>
                <div className={'center'}>
                    <div>
                        <a className={'icons'} onClick={store.handleSave}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'save'}/>
                            </div>
                            {showToolbar && <span>保存</span>}
                        </a>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'undo'}/>
                            </div>
                            {showToolbar && <span>撤销</span>}
                        </a>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'redo'}/>
                            </div>
                            { showToolbar && <span>重做</span> }
                        </a>
                    </div>
                    <ZoomItem handleZoom={store.handleZoom} value={scaleValue} showToolbar={showToolbar}/>
                    <div>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'export'}/>
                            </div>
                            { showToolbar && <span>下载</span> }
                        </a>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'share'}/>
                            </div>
                            { showToolbar && <span>分享</span> }
                        </a>
                    </div>
                </div>
                <div className={'right'}>
                    <div>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotSVG name={'code'}/>
                            </div>
                            { showToolbar && <span>标注</span> }
                        </a>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotSVG  name={'play'}/>
                            </div>
                            { showToolbar && <span>运行2</span> }
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    };
}
