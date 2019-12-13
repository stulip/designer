/**
 * 事件
 * @author tangzehua
 * @sine 2019-11-28 14:59
 */

// @flow
import React from 'react';
import {Form} from 'fr-ui'
import {DesignEvent} from 'fr-design'
import './../assets/events.pcss'
import {EventsStore} from "../store/EventsStore";
import {observer} from "mobx-react";

type Props = {
    store: EventsStore
};
type State = {};

@observer
export class Events extends React.Component<Props, State> {

    componentDidMount() {
        this.props.store.mount();
    }

    componentWillUnmount() {
        this.props.store.unmount();
    }

    render() {
        const {store} = this.props;
        return (
            <div className={'ds-events'}>
                <ol className={'event-list'}>
                    <Form.View config={store.formConfig} ref={store.formRef} onChange={store.handleFormData}
                               eventTarget={DesignEvent}/>
                </ol>
                <a className={'add-button'} onClick={store.handleAddEvent}>
                    <span>添加事件</span>
                </a>
            </div>
        );
    };
}
