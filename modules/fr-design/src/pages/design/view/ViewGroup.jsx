/**
 *
 * @author tangzehua
 * @sine 2019-10-10 09:45
 */

// @flow
import React from "react";
import {App} from "../../../widget/mobile";
import {observer} from "mobx-react";
import {classNames} from "fr-web";
import "../../../widget/assets";
import {ViewGroupStore} from "../store/ViewGroupStore";
import {LayoutConst, PropsConst, TextConst} from "../../../config/Attribute";
import {WidgetConst} from "../../../widget/WidgetConfig";

type Props = {
    store: ViewGroupStore
};
type State = {};

const WidgetConfig = [
    {
        cid: "cs1",
        component: WidgetConst.App.StatusBar
    },
    {
        cid: "ch0p",
        component: WidgetConst.App.Panel,
        widgetProps: {
            default: {
                [PropsConst.layoutFlexGrow]: 0
            },
        },
        children: ['ch1', 'ch2']
    },
    {
        cid: 'ch0c',
        name: "标题",
        component: WidgetConst.App.Text,
        states: [
            {
                name: '禁用',
                cid: 'state-ch0c1',
            }
        ],
        widgetProps: {
            default: {
                [PropsConst.textAlign]: TextConst.textAlign.center,
                [PropsConst.textSize]: 17,
            },
            "state-ch0c1": {
                [PropsConst.textSize]: 12,
            }
        },
        children: "设计中心",
    },
    {
        cid: "ch0",
        component: WidgetConst.App.Header,
        widgetProps: {},
        widget: {right: ['ch0p'], center: ['ch0c']}
    },
    {
        component: WidgetConst.App.Text,
        cid: "ch1",
        children: "菜单1",
        widgetProps: {
            default: {
                [PropsConst.widgetWidth]: 60,
            }
        }
    },
    {
        component: WidgetConst.App.Text,
        cid: "ch2",
        children: "菜单2"
    },
    {
        cid: "cbo0",
        component: WidgetConst.App.BottomOperateBar
    },
    {
        cid: "ct0",
        component: WidgetConst.App.Text,
        children:
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试" +
            "测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测" +
            "试测试测试测试测试测试测试测试测试测试测试测试测试测试" +
            "测试测试测试测试测试测试测试测试试测试测试测" +
            "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试试测试测试测试测试测试测试测试测试测试测试"
    },
    {
        cid: "cpt01",
        component: WidgetConst.App.Text,
        children: "刘亦菲"
    },
    {
        cid: "cpt02",
        component: WidgetConst.App.Text,
        children: "李小璐果照"
    },
    {
        cid: "cpt0",
        component: WidgetConst.App.Panel,
        widgetProps: {
            default: {
                [PropsConst.layoutJustifyContent]: LayoutConst.justifyContent.spaceBetween
            }
        },
        children: ["cpt01", "cpt02"]
    }
];

const GroupWidget = Array.from(new Set(["cs1", "ch0", "cbo0", "cpt0", "ct0"]));

@observer
export class ViewGroup extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        props.store.groupConfig = GroupWidget;
        props.store.widgetMap = WidgetConfig;
    }

    componentDidMount() {
        const store = this.props.store;
        store.mount();
    }

    componentWillUnmount() {
        const store = this.props.store;
        store.unmount();
    }

    createWidget = (cid: string) => {
        const widgetMap = this.props.store.widgetMap;
        const widget = widgetMap.get(cid);
        if (!widget) return null;

        const {
            main: {
                config: {designRect},
                section: {canvasRect, canvasScale}
            }
        } = this.props.store;

        const Comp = App[widget.component];
        return (
            Comp && (
                <Comp
                    key={widget.cid}
                    {...widget}
                    canvasRect={canvasRect}
                    designRect={designRect}
                    widgetMap={widgetMap}
                    module={App}
                />
            )
        );
    };

    eachWidget = config => {
        return config.map(this.createWidget);
    };

    _render() {
        const {store} = this.props;
        const {main} = store;
        const {canvasRect, canvasScale} = main.section;
        const {designRect} = main.config;
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
