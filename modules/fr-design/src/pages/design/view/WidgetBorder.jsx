/**
 * 组件选框
 * @author tangzehua
 * @sine 2019-10-11 15:05
 */

// @flow
import React from "react";

type Props = {
    selectRect: ClientRect,
    hoveRect: ClientRect,
    hoverFill: boolean, // 颜色覆盖
};

type State = {};

export class WidgetBorder extends React.PureComponent<Props, State> {
    renderHoveBorder() {
        const {hoveRect, hoverFill} = this.props;
        const {top, left, width, height} = hoveRect;
        const style = {
            top: `${top}%`,
            left: `${left}%`,
            width: `${width}%`,
            height: `${height}%`,
            transform: "rotate(0deg)"
        };
        if (hoverFill) {
            style.backgroundColor = 'rgba(228, 222, 255, 0.4)'
        }
        return <div className={"hove"} style={style}/>;
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
