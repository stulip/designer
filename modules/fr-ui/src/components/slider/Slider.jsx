/**
 *
 * @author tangzehua
 * @sine 2019-09-29 16:55
 */

// @flow
import React from 'react';
import './assets'
import {Tools} from "@xt-web/core";

type Props = {
    value: number, // [0, 100]
    onChange: (value: number) => void,
};
type State = {
    value: number, // [0, 100]
};

/**
 * 滑条
 */
export class Slider extends React.PureComponent<Props, State> {

    state = {
        value: this.props.value
    };

    barRef = React.createRef();

    static defaultProps = {
        onChange: ()=> {}
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value){
            return {value: nextProps.value};
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

    handleMouseUp = (event: MouseEvent) => {
        this.removeListener();
    };

    handleMouseDown = (event: MouseEvent) => {
        let that = this;
        event.stopPropagation();
        event.preventDefault();
        if (event.button !== 0) return;
        that.addListener();
    };

    handleMouseMove = (event: MouseEvent) => {
        let that = this;
        const { pageX} = event;
        const box = that.barRef.current.getBoundingClientRect();
        const delta = pageX - box.left - 7;
        const value = Math.max(0, Math.min(100, parseInt(delta / box.width * 100)));
        that.setState({value});
        that.props.onChange(value);
    };

    render() {
        let that = this;
        const {value} = this.state;
        return (
            <div className={"component-slider"}>
                <div className="rail" ref={that.barRef}>
                    <div className="fill" style={{ width: value + "%" }}/>
                    <div className="slider-btn" style={{ left: value + "%" }} onMouseDown={that.handleMouseDown}/>
                </div>
            </div>
        );
    };
}
