/**
 * 滚动视区
 * @author tangzehua
 * @sine 2019-09-04 11:01
 */

//@flow
import * as React from "react";
import "../assets/scrollbar.pcss";

type Props = {
    x: number, // [0, 1] X 轴
    y: number, // [0, 1] Y 轴
    size: {
        width: number,
        height: number,
        vecX: number,
        vecY: number
    },
    handleBarMove: ({x: number, y: number}) => {}
};

const SCROLL_TYPE = {X: 1, Y: 2};

export class ScrollBar extends React.PureComponent<Props> {
    static defaultProps = {
        handleBarMove: () => {}
    };

    // 鼠标是否按下
    _mouseDown = false;
    _mouseOffset = 0;
    constructor(props) {
        super(props);
    }

    mountListener (){
        window.addEventListener("mouseup", this.handleMouseUp);
        window.addEventListener("mousemove", this.handleMouseMove);
    }

    unmountListener (){
        window.removeEventListener("mouseup", this.handleMouseUp);
        window.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseXDown = (event: MouseEvent) => {
        let that = this;
        if (event.button === 0) {
            that._mouseDown = SCROLL_TYPE.X;
            const barHX = that.xhRef.getBoundingClientRect();
            that._mouseOffset = event.pageX - barHX.left;
            that.mountListener();
        }
    };

    handleMouseYDown = (event: MouseEvent) => {
        let that = this;
        if (event.button === 0) {
            that._mouseDown = SCROLL_TYPE.Y;
            const barHY = that.yhRef.getBoundingClientRect();
            that._mouseOffset = event.pageY - barHY.top;
            that.mountListener();
        }
    };

    handleMouseUp = () => {
        let that = this;
        that._mouseDown = 0;
        that._mouseOffset = 0;
        that.unmountListener();
    };

    handleMouseMove = (event: MouseEvent) => {
        let that = this;
        const { pageY, pageX } = event;

        if (that._mouseDown) {
            const {  size } = this.props;
            if (that._mouseDown === SCROLL_TYPE.X) {
                const barX = that.xRef.getBoundingClientRect();
                const x = (pageX - that._mouseOffset - barX.left) /  (barX.width * size.vecX / 100);
                that.props.handleBarMove({x});
            } else if (that._mouseDown === SCROLL_TYPE.Y) {
                const barY = that.yRef.getBoundingClientRect();
                const y = (pageY - that._mouseOffset - barY.top) /  (barY.height * size.vecY / 100);
                that.props.handleBarMove({y});
            }
        }
    };

    render() {
        let that = this;
        const { x = 0, y = 0, size } = this.props;
        const scrollX = Math.min(size.vecX, x * size.vecX);
        const scrollY = Math.min(size.vecY, y * size.vecY);
        return (
            <div className={"scroll-bar"}>
                <div data-axis={"x"} className={"track x-track"} ref={rf => (that.xRef = rf)}>
                    <div
                        ref={rf => (that.xhRef = rf)}
                        className={"handler"}
                        style={{ width: size.width + "%", left: scrollX + "%" }}
                        onMouseDown={that.handleMouseXDown}
                    >
                        <div className={"thumb"} />
                    </div>
                </div>
                <div data-axis={"y"} className={"track y-track"} ref={rf => (that.yRef = rf)}>
                    <div
                        ref={rf => (that.yhRef = rf)}
                        className={"handler"}
                        style={{ height: size.height + "%", top: scrollY + "%" }}
                        onMouseDown={that.handleMouseYDown}
                    >
                        <div className={"thumb"} />
                    </div>
                </div>
            </div>
        );
    }
}
