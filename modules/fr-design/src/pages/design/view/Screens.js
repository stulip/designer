/**
 * 设计视口
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 11:48
 */

import React from 'react';
import '../assets/screens.pcss'

type Props = {

};

type State = {

};

export class Screens extends React.Component<Props, State> {

    handleWheel = (event)=> {
        console.log(event)
    };

    render() {
        return (
            <div id={'screens'} onWheel={this.handleWheel}>
                <div className={'viewport'}>
                </div>
            </div>
        );
    };
};
