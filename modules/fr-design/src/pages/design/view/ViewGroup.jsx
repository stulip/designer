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

    handleMouseDown = (event: MouseEvent) => {
        if (event.button !== 0 || (event.ctrlKey || event.metaKey)) return;
        event.stopPropagation();
        event.preventDefault();
    };

    _render() {
        const that = this;
        const { store } = this.props;
        const { main, widgetModule } = store;
        const { canvasRect, canvasScale } = main.section;
        const { designRect } = main.config;
        return (
            <div className={`group-list group-content ${designRect.type}`} ref={store.groupRef}
                 onMouseDown={that.handleMouseDown}>
                {widgetModule && store.createWidget(store.widgetIds)}
            </div>
        );
    }

    render() {
        return this._render();
    }
}
