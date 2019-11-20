/**
 *
 * @author tangzehua
 * @sine 2019-10-10 09:45
 */

// @flow
import React from "react";
import {observer} from "mobx-react";
import "../../../widget/assets";
import {ViewGroupStore} from "../store/ViewGroupStore";
import {RootWidget} from './../../../widget'

type Props = {
    store: ViewGroupStore
};
type State = {};

@observer
export class ViewGroup extends React.Component<Props, State> {

    componentDidMount() {
        const store = this.props.store;
        store.mount();
    }

    componentWillUnmount() {
        const store = this.props.store;
        store.unmount();
    }

    _render() {
        const that = this;
        const {store} = this.props;
        const {main, widgetModule, rootRef} = store;
        const {canvasRect} = main.section;
        const {designRect} = main.config;
        return (
            <RootWidget
                designRect={designRect}
                canvasRect={canvasRect}
                children={store.widgetIds}
                widgetMap={store.widgetMap}
                module={widgetModule}
                ref={rootRef}
            />
        )
    }

    render() {
        return this._render();
    }
}
