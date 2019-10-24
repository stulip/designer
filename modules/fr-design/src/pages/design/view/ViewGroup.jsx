/**
 *
 * @author tangzehua
 * @sine 2019-10-10 09:45
 */

// @flow
import React from "react";
import { App } from "../../../widget/mobile";
import { observer } from "mobx-react";
import { classNames } from "fr-web";
import "../../../widget/assets";
import { ViewGroupStore } from "../store/ViewGroupStore";
import { LayoutConst, PropsConst } from "../../../config/Attribute";
import { WidgetConst } from "../../../widget/WidgetConfig";
import { Types, XMath } from "@xt-web/core";
import { BaseWidget } from "../../../widget/base/BaseWidget";

type Props = {
    store: ViewGroupStore
};
type State = {};

const GroupWidget = [
    {
        component: WidgetConst.App.StatusBar
    },
    {
        component: WidgetConst.App.Header,
        config: {
            "header.title": "设计中心"
        },
        children: [
            {
                component: WidgetConst.App.Text,
                children: "菜单1"
            },
            {
                component: WidgetConst.App.Text,
                children: "菜单2"
            }
        ]
    },
    {
        component: WidgetConst.App.BottomOperateBar
    },
    {
        component: WidgetConst.App.Panel,
        config: {
            [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.spaceBetween
        },
        children: [
            {
                component: WidgetConst.App.Text,
                children: "刘亦菲"
            },
            {
                component: WidgetConst.App.Text,
                children: "李小璐果照"
            }
        ]
    },
    {
        component: WidgetConst.App.Text,
        children:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
    },
    {
        component: WidgetConst.App.Text,
        children:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
    },
    {
        component: WidgetConst.App.Text,
        children:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试"
    },
    {
        component: WidgetConst.App.Text,
        children:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试" +
            "测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测" +
            "试测试测试测试测试测试测试测试测试测试测试测试测试测试" +
            "测试测试测试测试测试测试测试测试试测试测试测" +
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试试测试测试测试测试测试测试测试测试测试测试"
    }
];

@observer
export class ViewGroup extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        props.store.groupConfig = GroupWidget;
    }

    componentDidMount() {
        const store = this.props.store;
        store.mount();
    }

    componentWillUnmount() {
        const store = this.props.store;
        store.unmount();
    }

    createWidget = (widget: BaseWidget, parent: BaseWidget) => {
        const current = React.createRef();
        let children = widget.children;
        if (Types.isArray(children)) {
            children = this.eachWidget(children, current);
        } else if (Types.isObject(children)) {
            children = this.createWidget();
        }

        const { main, groupRef } = this.props.store;
        const { canvasRect, canvasScale } = main.section;
        const { designRect } = main.config;

        const Comp = App[widget.component];
        widget.cid = XMath.guid(16);
        return (
            Comp && (
                <Comp
                    key={widget.cid}
                    {...widget}
                    ref={current}
                    canvasRect={canvasRect}
                    designRect={designRect}
                    groupRef={groupRef}
                    parent={parent}
                >
                    {children}
                </Comp>
            )
        );
    };

    eachWidget = (config, parent) => {
        return config.map(widget => this.createWidget(widget, parent));
    };

    _render() {
        const { store } = this.props;
        const { main } = store;
        const { canvasRect, canvasScale } = main.section;
        const { designRect } = main.config;

        return (
            <div className={classNames("group-list", designRect.type)} ref={store.groupRef}>
                {this.eachWidget(store.groupConfig)}
            </div>
        );
    }

    render() {
        return this._render();
    }
}
