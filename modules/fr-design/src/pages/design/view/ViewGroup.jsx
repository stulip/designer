/**
 *
 * @author tangzehua
 * @sine 2019-10-10 09:45
 */

// @flow
import React from "react";
import { App } from "../../../widget/mobile";
import { observer } from "mobx-react";
import {classNames, DesignEvent} from "fr-web";
import "../../../widget/assets";
import { ViewGroupStore } from "../store/ViewGroupStore";
import {EventConst} from "../../../config/Attribute";
import {WidgetConst} from "../../../widget/WidgetConfig";

type Props = {
    store: ViewGroupStore
};
type State = {};

const GroupWidget = [
    {
        component: WidgetConst.App.StatusBar,
    },
    {
        component: WidgetConst.App.Header,
        value: {
            title: '采购中心'
        },
        children: [

        ]
    },
    {
        component: WidgetConst.App.BottomOperateBar
    },
    {
        component: WidgetConst.App.Panel,
        children: [
            {
                component: WidgetConst.App.Text,
                value: '刘亦菲'
            },
            {
                component: WidgetConst.App.Text,
                value: '李小璐果照'
            }
        ]
    },
    {
        component: WidgetConst.App.Text,
        value: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
    },
    {
        component: WidgetConst.App.Text,
        value: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
    },
    {
        component: WidgetConst.App.Text,
        value: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试'
    },
    {
        component: WidgetConst.App.Text,
        value: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试' +
            '测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测' +
            '试测试测试测试测试测试测试测试测试测试测试测试测试测试' +
            '测试测试测试测试测试测试测试测试试测试测试测' +
            '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试试测试测试测试测试测试测试测试测试测试测试'
    }
];


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

    createWidget = (config) =>{
        const { store } = this.props;
        const { main } = store;
        const { canvasRect, canvasScale } = main.section;
        const { designRect } = main.config;
        return config.map((widget, index) => {
            const Comp = App[widget.component];
            return Comp && (
                <Comp key={index} {...widget} canvasRect={canvasRect} designRect={designRect} groupRef={store.groupRef}>
                    {widget.children && this.createWidget(widget.children)}
                </Comp>
            )
        });
    };

    _render() {
        const { store } = this.props;
        const { main } = store;
        const { canvasRect, canvasScale } = main.section;
        const { designRect } = main.config;

        return (
            <div className={classNames("group-list", designRect.type)} ref={store.groupRef}>
                {this.createWidget(GroupWidget)}
            </div>
        );
    }

    render() {
        return this._render();
    }
}
