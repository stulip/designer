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

type Props = {
    store: ToolbarStore
};
type State = {

};

export class Toolbar extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'ds-toolbar'}>
                <div className={'left'}>
                    <IBotIcon className={'back'} type={'mb'} name={'mobile-back'} onClick={() => Route.push("/")}/>
                    <span className={'title'}>App Design</span>
                </div>
                <div className={'center'}>
                    <div>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'save'}/>
                            </div>
                            <span>保存</span>
                        </a>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'undo'}/>
                            </div>
                            <span>撤销</span>
                        </a>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'redo'}/>
                            </div>
                            <span>重做</span>
                        </a>
                    </div>
                    <div>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'export'}/>
                            </div>
                            <span>下载</span>
                        </a>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotIcon type={'dora'} name={'share'}/>
                            </div>
                            <span>分享</span>
                        </a>
                    </div>
                </div>
                <div className={'right'}>
                    <div>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotSVG name={'code'}/>
                            </div>
                            <span>标注</span>
                        </a>
                        <a className={'icons'}>
                            <div className={'wrapper'}>
                                <IBotSVG  name={'play'}/>
                            </div>
                            <span>运行</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    };
};
