/**
 * 事件
 * @author tangzehua
 * @sine 2019-11-28 14:59
 */

// @flow
import React from 'react';
import './../assets/events.pcss'

type Props = {};
type State = {};

export class Events extends React.Component<Props, State> {
    render() {
        const {store} = this.props;
        return (
            <div className={'ds-events'}>
                <a className={'add-button'} onClick={store.handleAddEvent}>
                    <span>添加事件</span>
                </a>
            </div>
        );
    };
}
