/**
 * 组件选框
 * @author tangzehua
 * @sine 2019-10-11 15:05
 */

// @flow
import React from "react";
import { ViewGroupStore } from "../store/ViewGroupStore";
import {observer} from "mobx-react";

type Props = {
    selectRect: ClientRect,
    hoveRect: ClientRect
};

type State = {};

export class WidgetBorder extends React.PureComponent<Props, State> {
    renderHoveBorder() {
        const { hoveRect } = this.props;
        const { top, left, width, height } = hoveRect;
        const style = {
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}%`,
            height: `${height}%`,
            transform: "rotate(0deg)"
        };
        return <div className={"hove"} style={style} />;
    }

    renderSelectBorder() {
        const { selectRect } = this.props;
        const { top, left, width, height } = selectRect;
        const style = {
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}%`,
            height: `${height}%`,
            transform: "rotate(0deg)",
            borderStyle: "solid"
        };
        return <div className={"select"} style={style} />;
    }

    render() {
        const { hoveRect, selectRect } = this.props;
        return (
            <div className={"widget-border"}>
                {hoveRect && this.renderHoveBorder()}
                {selectRect && this.renderSelectBorder()}
            </div>
        );
    }
}
