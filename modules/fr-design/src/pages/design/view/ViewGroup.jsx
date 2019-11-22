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

/*
{

}

{
    cid: 'w-123',
    name: "导航栏",
    component: WidgetConst.App.Header,
	states: [
		{
		    name: "禁止",
		    cid: 's-123'
		}
	],
	event: {
		"w-123: ['e-123', 'e-124'],
		"s-123": ['e-223']
	},
	props: {
		"w-123: {
            //css 属性
		},
		"s-123": {

		}
	},
	children: []|string,
	draggable: true,
	visible: true,

}

 */

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
