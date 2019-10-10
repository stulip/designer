/**
 *
 * @author tangzehua
 * @sine 2019-10-10 09:45
 */

// @flow
import React from 'react';
import {StatusBar} from "../../../components/mobile/StatusBar";
import {observer} from "mobx-react";
import {OperateBar} from "../../../components/mobile/OperateBar";
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
            <div className={"group-list"}>
                <StatusBar width={canvasRect.width} height={designRect.top}/>
                <OperateBar width={canvasRect.width} height={designRect.bottom} designHeight={canvasRect.height}/>
            </div>
        );
    };
}
