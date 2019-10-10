/**
 *
 * @author tangzehua
 * @sine 2019-10-10 09:45
 */

// @flow
import React from 'react';
import {StatusBar, Header, IPhoneXOperateBar} from "../../../components";
import {observer} from "mobx-react";
import {classNames} from 'fr-web'
import '../../../components/assets'

type Props = {

};
type State = {

};

@observer
export class ViewGroup extends React.Component<Props, State> {

    render() {
        const {main} = this.props.store;
        const {canvasRect, canvasScale} = main.section;
        const {designRect} = main.config;

        return (
            <div className={classNames("group-list", designRect.type)}>
                <StatusBar width={canvasRect.width} height={designRect.top}/>
                <Header width={canvasRect.width} height={designRect.nav_height}/>
                <IPhoneXOperateBar width={canvasRect.width} height={designRect.bottom} designHeight={canvasRect.height}/>
            </div>
        );
    };
}
