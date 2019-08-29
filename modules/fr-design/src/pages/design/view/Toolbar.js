/**
 * 设计器工具栏
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 10:07
 */

import * as React from 'react';

import '../assets/toolbar.pcss'
import {Route} from "@xt-web/react-dom";
import {IBotIcon} from 'fr-web';
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
                    center
                </div>
                <div className={'right'}>
                    right
                </div>
            </div>
        );
    };
};
