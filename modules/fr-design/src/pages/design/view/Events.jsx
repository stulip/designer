/**
 * 事件
 * @author tangzehua
 * @sine 2019-11-28 14:59
 */

// @flow
import React from 'react';
import {Form} from 'fr-ui'
import './../assets/events.pcss'
import {EventsStore} from "../store/EventsStore";
import {observer} from "mobx-react";

type Props = {
    store: EventsStore
};
type State = {};

@observer
export class Events extends React.Component<Props, State> {
    render() {
        const {store} = this.props;
        return (
            <div className={'ds-events'}>
                <ol className={'event-list'}>
                    <Form.View config={store.formConfig} ref={store.formRef} formData={store.formData}/>
                </ol>
                <a className={'add-button'} onClick={store.handleAddEvent}>
                    <span>添加事件</span>
                </a>
            </div>
        );
    };
}
