/**
 *
 * @author tangzehua
 * @sine 2019-09-17 14:41
 */

// @flow
import * as React from "react";
import { IBotIcon } from "fr-web";
import {observable} from "mobx";
import {observer} from "mobx-react";


type Props = {
    handleResize: ( deltaX: number, deltaY: number ) => void,
    direction?: 0|1|2,// 0 全方向, 1 = X轴, 2 = Y轴
    width: number,
    height: number
};

type State = {
    isMove: boolean,
};

export class AdjustSizeCanvas extends React.PureComponent<Props, State> {

    static defaultProps = {
        direction: 2
    };

    constructor(props) {
        super(props);
        this.resizeYRef = React.createRef();
        this.originPosition = { x: 0, y: 0, originX: 0, originY: 0 };
        this.state = {
            isMove: false,
        }
    }

    addListener() {
        window.addEventListener("mouseup", this.handleMouseUp);
        window.addEventListener("mousemove", this.handleMouseMove);
    }

    removeListener() {
        window.removeEventListener("mouseup", this.handleMouseUp);
        window.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseUp = (event: MouseEvent) => {
        this.removeListener();
        this.setState({isMove: false});
    };

    handleMouseDown = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.button !== 0) return;
        const {pageY, pageX} = event;
        let that = this;

        const {left, top,} = that.resizeYRef.current.getBoundingClientRect();
        that.setState({isMove: true});
        that.addListener();
        that.originPosition = { x: pageX, y: pageY, originX: left + 4, originY: top + 4 };
    };

    handleMouseMove = (event: MouseEvent) => {
        let that = this;
        if ( !that.state.isMove) return;
        const {direction} = that.props;
        const { pageX, pageY} = event;
        const { x, y, originX, originY} = that.originPosition;

        let deltaX = 0, deltaY = 0;
        if (direction === 1){
            deltaX = pageX - x;
        } else if(direction === 2){
            deltaY = pageY - y;
        } else {
            deltaX = pageX - x;
            deltaY = pageY - y;
        }
        const {left, top} = that.resizeYRef.current.getBoundingClientRect();
        that.originPosition = { x: pageX, y: pageY, originX: left + 4, originY:top + 4};

        if (deltaY > 0 && originY > pageY || deltaX > 0 && originX > pageX){
            return;
        }
        that.props.handleResize( deltaX, deltaY );

    };

    render() {
        let that = this;
        const {width, height} = that.props;
        return (
            <div className={"drag-resize"}>
                <div className={"resize-y"} onMouseDown={that.handleMouseDown} ref={that.resizeYRef}>
                    <span className="enlarge">
                        <IBotIcon name={"arrow_down"} type={"dora"} />
                    </span>
                    <span className="tip">{that.state.isMove? `${width} x ${height}`: "拖动调节页面高度"}</span>
                    <span className="reduce">
                        <IBotIcon name={"arrow_up"} type={"dora"} />
                    </span>
                </div>
            </div>
        );
    }
}
