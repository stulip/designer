/**
 * @flow
 * @author tangzehua
 * @sine 2019-09-18 10:23
 */

import React, { Component } from "react";
import { IBotIcon, ColorPicker as Picker } from "fr-web";
import "./assets/index.pcss";
import { Types } from "@xt-web/core";

const parseColor = Picker.parseColor;
// 默认主题颜色
const THEME_COLORS = [
    "#FFFFFF",
    "#3F51B5",
    "#FF4081",
    "#E51C23",
    "#009688",
    "#259B24",
    "#8BC34A",
    "#FF9800",
    "#F8E71C"
];

type Props = {
    color: number | string,
    headerText?: string,
    // 主题颜色集合
    themeColors?: Array<string>,
    onChange?: (color: number | string) => void,
    targetRect: ClientRect
};

type State = {
    color: number | string,
    visible: boolean,
    targetRect: ClientRect
};

export class ColorPicker extends React.Component<Props, State> {
    static defaultProps = {
        themeColors: THEME_COLORS,
        onChange: () => {},
        onConfirm: () => {},
        headerText: "选择颜色"
    };

    clickEvent = false;

    state = {
        color: this.props.color,
        pColor: this.props.color,
        visible: false,
        position: { x: 0, y: 0 }
    };

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const { targetRect } = nextProps;
        if (nextProps.color !== prevState.pColor || targetRect !== prevState.targetRect) {
            const visible =
                !Types.isEmpty(targetRect) && targetRect !== prevState.targetRect ? true : prevState.visible;
            const color = nextProps.color !== prevState.pColor ? nextProps.color: prevState.color;
            return {color, pColor: nextProps.color, visible, targetRect };
        }
        return null;
    }

    componentDidUpdate() {
        let that = this;
        if (that.state.visible && !that.clickEvent){
            that.clickEvent = true;
            document.addEventListener("mousedown", that.handleClose);
            console.log('add')
        }
        if ( !that.state.visible){
            that.clickEvent = false;
            document.removeEventListener('mousedown', that.handleClose);
        }
    }

    getHistoryColors = () => {
        return JSON.parse(localStorage.getItem("pickerPrevColors") || "[]");
    };

    addLastColorToHistory = () => {
        const { color } = this.state;
        const { themeColors } = this.props;
        const { hex, alpha } = parseColor(color);
        let history = JSON.parse(localStorage.getItem("pickerPrevColors") || "[]");

        if ((themeColors.includes(hex) && alpha === 1) || color === "transparent") {
            return;
        } else if (history.includes(color)) {
            history.splice(history.indexOf(color), 1);
        } else {
            history = history.slice(0, 17);
        }

        history.unshift(color);
        localStorage.setItem("pickerPrevColors", JSON.stringify(history));
    };

    handleDragStart = event => {
        const { clientX, clientY } = event;
        const {
            position: { x, y }
        } = this.state;

        const onMouseMove = e => {
            const offsetX = e.clientX - clientX;
            const offsetY = e.clientY - clientY;
            this.setState({
                position: {
                    x: x + offsetX,
                    y: y + offsetY
                }
            });
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    centerColorPicker = $colorPicker => {
        const colorPickerRect = $colorPicker.getBoundingClientRect();
        const { targetRect } = this.props;
        const position = {
            x: Math.max(0, Math.round(targetRect.left - colorPickerRect.width - 10)),
            y: Math.max(50, Math.round(targetRect.top - colorPickerRect.height / 3))
        };

        position.y = Math.min(position.y, window.innerHeight - colorPickerRect.height - 10);
        this.setState({ position });
    };

    handleClose = () => {
        this.setState({ visible: false });
    };

    handleChange = color => {
        this.setState({ color });
        this.props.onChange && this.props.onChange(color);
    };

    handleConfirm = color => {
        this.setState({ color });
        this.props.onChange && this.props.onChange(color);
    };

    render() {
        let that = this;
        const { position, visible, color } = that.state;
        if (!visible) return null;

        const { themeColors, headerText } = that.props;
        const historyColors = this.getHistoryColors();
        return (
            <div
                className={"ui-color-pick"}
                style={{ left: position.x, top: position.y }}
            >
                <Picker
                    color={color}
                    onChange={that.handleChange}
                    onConfirm={that.handleConfirm}
                    onClose={that.handleClose}
                    themeColors={themeColors}
                    customColors={historyColors}
                    headerText={headerText}
                    customColorsHeaderText="历史值"
                    applyDidMountSideEffect={that.centerColorPicker}
                    applyWillUnmountSideEffect={that.addLastColorToHistory}
                    onDragStart={that.handleDragStart}
                >
                    <SystemColorPicker />
                </Picker>
            </div>
        );
    }
}

class SystemColorPicker extends React.Component {
    handleSystem = e => this.props.handleChange({ hex: e.target.value, a: this.props.alpha });

    render() {
        const { hex } = this.props;
        return (
            <div className="system-wrapper">
                <IBotIcon type="dora" name="tube" />
                <input className="system" type="color" value={hex} onChange={this.handleSystem} />
            </div>
        );
    }
}
