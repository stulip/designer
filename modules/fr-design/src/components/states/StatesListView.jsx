/**
 * 状态列表
 * @author tangzehua
 * @sine 2019-10-31 10:55
 */

// @flow
import React from "react";
import {IBotSVG} from "fr-web";
import {SVG} from "fr-ui";
import "./asstes/states.pcss";
import type {WidgetState} from "../../flow/Main.flow";
import {StatesConst} from "../../config/Attribute";

type Props = {
    data: [WidgetState],
    activeId: string,
    onAdd: (state: WidgetState) => void,
    onChange: (stateId: string)=> void,
};
type State = {
    activeId: string,
    data: [WidgetState]
};

/**
 * 全局状态: 很多事件需要绑定, 比如: 鼠标移入效果
 * 默认状态: 和全局状态一样, 就是事件不一样
 */
export class StatesListView extends React.PureComponent<Props, State> {

    state = {
        activeId: "",
        data: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.prevData) {
            const activeId = nextProps.activeId || StatesConst.global.cid;
            const data = [StatesConst.global, StatesConst.default, ...nextProps.data];
            return {activeId, data, prevData: nextProps.data}
        }
        return null;
    }

    handleClick = (event: MouseEvent) => {
        const that = this;
        const cid = event.currentTarget.getAttribute("data-cid");
        that.setState({activeId: cid});
        that.props.onChange && that.props.onChange(cid);
    };

    renderItem = (item, index) => {
        const that = this;
        const {activeId} = that.state;
        return (
            <li
                key={item.cid}
                data-cid={item.cid}
                onClick={that.handleClick}
                className={activeId === item.cid ? "active" : ""}
            >
                <span className="index">{index}</span>
                <span>{item.name}</span>
            </li>
        );
    };

    render() {
        const that = this;
        const {onAdd} = that.props;
        const {data} = that.state;
        return (
            <>
                <div className="states-header">
                    <a className="new-state" onClick={onAdd}>
                        <IBotSVG icon={SVG.plus_o} className={"icon"}/>
                        <span>新状态</span>
                    </a>
                </div>
                <ol className={"state-list"}>
                    {data.map(that.renderItem)}
                </ol>
            </>
        );
    }
}
