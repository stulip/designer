/**
 * 矩形选框
 * @author tangzehua
 * @sine 2019-09-12 16:48
 */

// @flow
import * as React from "react";

type BoundRect = {
    x: number,
    y: number,
    width: number,
    height: number,
    originX: number,
    originY: number
};
type Props = {
    rect: BoundRect,
    handleRect?: (event: MouseEvent) => void
};

type State = {};

export class RangeSelection extends React.PureComponent<Props, State> {
    static defaultProps = {
        handleRect: () => {}
    };

    componentDidMount() {
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseUp = (event: MouseEvent) => {
        this.props.handleRect();
    };

    handleMouseMove = (event: MouseEvent) => {
        let that = this;
        const { rect: propsRect } = that.props;
        if (!propsRect) return;

        const { pageX, pageY } = event;
        const { originX, originY } = propsRect;
        const width = Math.abs(pageX - originX);
        const height = Math.abs(pageY - originY);

        const rect = {
            x: pageX < originX ? originX - width : originX,
            y: pageY < originY ? originY - height : originY,
            originX,
            originY,
            width,
            height
        };
        that.props.handleRect(rect);
    };

    render() {
        const { rect } = this.props;
        if (!rect || rect.width === 0 || rect.height === 0) return null;

        const rangeStyle = { top: rect.y, left: rect.x, width: rect.width, height: rect.height };
        return <div className={"range-selection"} style={rangeStyle} />;
    }
}
