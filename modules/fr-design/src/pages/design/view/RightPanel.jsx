/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:28
 */

import React from 'react';
import {IBotIcon, IBotSVG} from 'fr-web';
import {common_widget} from './svg'

type Props = {

};
type State = {

};


export class RightPanel extends React.Component<Props, State> {
    render() {
        return (
            <div className={'panel-right'}>
                <div className={'slide-bar'}>
                    <a className={'nav-button'}>
                        <IBotSVG  icon={common_widget}/>
                    </a>
                    <span className={'line'}/>
                    <div className={'nav-buttons'}>
                        <a className={'nav-button'}>
                            <IBotSVG name={'design/common_widget'}/>
                        </a>
                        <a className={'nav-button'}>
                            <IBotSVG name={'design/my_widget'}/>
                        </a>
                        <a className={'nav-button'}>
                            <IBotSVG name={'design/smiley'}/>
                        </a>
                        <a className={'nav-button'}>
                            <IBotSVG name={'design/master'}/>
                        </a>
                        <a className={'nav-button trash-button'}>
                            <IBotSVG name={'recycle'}/>
                        </a>
                    </div>
                </div>
                <div className={'content'}>

                </div>
            </div>
        );
    };
};
