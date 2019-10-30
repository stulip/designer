/**
 * 弹出层面板
 * @author tangzehua
 * @sine 2019-09-20 16:09
 */

// @flow
import * as React from "react";
import {classNames, IBotSVG} from "fr-web";
import {arrow_right} from "../../assets/svg";
import "./assets";

type Props = {
    title: string,
    visible: boolean,
    className?: string,
    drag: boolean,
    top?: number, // -1 居中
    left?: number // -1 居中
};

type State = {
    visible: boolean
};

export class PopupPanel extends React.PureComponent<Props, State> {
    state = {
        visible: false,
        position: {},
        bottom: "",
        right: ""
    };

    static defaultProps = {
        top: 0,
        drag: false,
        onClose: () => {
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visible !== prevState.visible) {
            const {position} = prevState;

            const {top, left} = prevState.prevProps || {};
            let right = prevState.right,
                bottom = prevState.bottom;

            if (nextProps.top !== top || nextProps.left !== left) {
                ({left: position.x, top: position.y} = nextProps);
                if (position.x === -1) right = -1;
                if (position.y === -1) bottom = -1;
            }

            return {visible: nextProps.visible, position, bottom, right, prevProps: nextProps};
        }
        return null;
    }

    addListener() {
        document.addEventListener("mouseup", this.handleMouseUp);
        document.addEventListener("mousemove", this.handleMouseMove);
    }

    removeListener() {
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseMove = (event: MouseEvent) => {
        const that = this;
        const rect = that.aside.getBoundingClientRect();
        const {clientX = 0, clientY = 0, x, y} = that.originPosition;

        const offsetX = event.clientX - clientX;
        const offsetY = event.clientY - clientY;
        const position = {
            x: x + offsetX,
            y: y + offsetY
        };
        position.x = Math.min(Math.max(0, position.x), window.innerWidth - rect.width);
        that.setState({position});
    };

    handleMouseUp = (event: MouseEvent) => {
        this.removeListener();
    };

    handleMouseDown = (event: MouseEvent) => {
        const that = this;
        if (!that.props.drag || event.button !== 0) return;

        // event.stopPropagation();
        // event.preventDefault();

        const {clientX, clientY} = event;
        const rect = that.aside.getBoundingClientRect();
        const x = rect.left;
        const y = rect.top;

        that.originPosition = {clientX, clientY, x, y};
        that.setState({position: {x, y}, right: "initial", bottom: "initial"});
        that.addListener();
    };

    handleClose = () => {
        this.props.onClose();
        this.setState({visible: false});
    };

    _render() {
        let that = this;
        const {title, className, children, top, drag} = that.props;
        const {position, bottom, right} = that.state;

        const style = {top: position.y, left: position.x, bottom, right};

        return (
            <aside className={classNames("popup-panel", className)} style={style} ref={rf => (that.aside = rf)}>
                <header onMouseDown={that.handleMouseDown} className={classNames({draggable: drag})}>
                    <p className="title">{title}</p>
                    <div className="header-buttons">
                        <a className={"icon dora"} onClick={that.handleClose}>
                            {drag ? (
                                <IBotSVG name={"times"}/>
                            ) : (
                                <IBotSVG icon={arrow_right} className={"times-icon"}/>
                            )}
                        </a>
                    </div>
                </header>
                <section className={"panel-body"}>{children}</section>
            </aside>
        );
    }

    render() {
        const {visible} = this.state;
        if (!visible) return null;
        return this._render();
    }
}
