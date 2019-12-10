/**
 * @flow
 * @author tangzehua
 * @sine 2019-09-18 10:23
 */

import React from "react";
import {ColorPicker as Picker} from "fr-web";
import "./assets";
import {colorPanelList} from './constant'
import {Types} from "@xt-web/core";

const TUBE_SVG = <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M10.751.934l-2.2 2.2-.89-.89a.935.935 0 0 0-1.322 0l-.413.413a.935.935 0 0 0 0 1.322l.7.7L.59 10.714a.458.458 0 0 0-.132.377l-.003 2.045c0 .226.183.41.409.41H2.96c.122 0 .239-.049.325-.136l6.036-6.035.7.699a.935.935 0 0 0 1.321 0l.413-.413a.935.935 0 0 0 0-1.322l-.89-.89 2.2-2.2A1.636 1.636 0 0 0 10.751.933zM4.739 10.74l-2.414-.485L7.432 5.13 8.87 6.575 4.74 10.74z"
        fill="#415058" fillRule="nonzero"/>
</svg>;

// 默认主题颜色
const THEME_COLORS = [
    "transparent",
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

const getPanelColors = () => {

};

export class ColorPicker extends React.Component<Props, State> {
    static defaultProps = {
        themeColors: THEME_COLORS,
        onChange: () => {
        },
        onConfirm: () => {
        },
        headerText: "选择颜色"
    };

    clickEvent = false;

    state = {
        color: this.props.color,
        pColor: this.props.color,
        visible: false,
        isClickExpand: false,
        currentSelect: "最近使用",
        colorPanelList: [],
        position: {x: 0, y: 0}
    };

    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        const { targetRect } = nextProps;
        if (nextProps.color !== prevState.pColor || targetRect !== prevState.targetRect) {
            const visible =
                !Types.isEmpty(targetRect) && targetRect !== prevState.targetRect ? true : prevState.visible;
            const color = nextProps.color !== prevState.pColor ? nextProps.color : prevState.color;
            return {color, pColor: nextProps.color, visible, targetRect};
        }
        return {pColor: nextProps.color};
    }

    componentDidUpdate() {
        let that = this;
        if (that.state.visible && !that.clickEvent) {
            that.clickEvent = true;
            document.addEventListener("mousedown", that.handleClose);
        }
        if (!that.state.visible) {
            that.clickEvent = false;
            document.removeEventListener('mousedown', that.handleClose);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const that = this;
        return nextProps.color !== that.props.color
            || nextProps.targetRect !== that.props.targetRect
            || nextState.color !== that.state.color
            || nextState.position !== that.state.position
            || nextState.visible !== that.state.visible
            || nextState.isClickExpand !== that.state.isClickExpand
            || nextState.currentSelect !== that.state.currentSelect
    }

    componentDidMount() {
        this.setState({colorPanelList: this.getPanelColors()});
    }

    getPanelColors() {
        return [{
            name: '最近使用',
            key: 'history',
            colors: JSON.parse(window.localStorage.getItem('pickerPrevColors') || '[]')
        }, ...colorPanelList];
    }

    addLastColorToHistory = () => {
        const {color, colorPanelList} = this.state;
        let history = JSON.parse(localStorage.getItem("pickerPrevColors") || "[]");

        if (history.includes(color)) {
            history.splice(history.indexOf(color), 1)
        } else {
            history = history.slice(0, 17)
        }

        history.unshift(color);
        colorPanelList[0].colors = history;

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
        this.setState({visible: false, pColor: null});
    };

    handleChange = color => {
        this.setState({color});
        this.props.onChange && this.props.onChange(color);
    };

    handleConfirm = color => {
        this.setState({color});
        // this.props.onChange && this.props.onChange(color);
    };

    handleToogleExpand = () => {
        this.setState({isClickExpand: !this.state.isClickExpand})
    };

    handleChangeSelect = currentSelect => this.setState({currentSelect});

    render() {
        let that = this;
        const {position, visible, color, colorPanelList, isClickExpand, currentSelect} = that.state;
        if (!visible) return null;
        const {headerText} = that.props;
        return (
            <div
                className={"ui-color-pick"}
                style={{left: position.x, top: position.y,}}
            >
                <Picker
                    headerText={headerText}
                    color={color}
                    onChange={that.handleChange}
                    onConfirm={that.handleConfirm}
                    onClose={that.handleClose}
                    applyDidMountSideEffect={that.centerColorPicker}
                    applyWillUnmountSideEffect={that.addLastColorToHistory}
                    onDragStart={that.handleDragStart}

                    colorPanelList={colorPanelList}
                    onChangeSelect={this.handleChangeSelect}
                    currentSelect={currentSelect}
                    isExpandFeature={true}
                    isClickExpand={isClickExpand}
                    onToogleExpand={this.handleToogleExpand}
                >
                    <SystemColorPicker/>
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
                {TUBE_SVG}
                <input className="system" type="color" value={hex} onChange={this.handleSystem} />
            </div>
        );
    }
}
