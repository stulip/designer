/**
 *
 * @author tangzehua
 * @sine 2019-09-12 16:48
 */

// @flow
import * as React from "react";
import { observer } from "mobx-react";

type Props = {
    position?: MouseEvent,
    handleMouseUp?: (event: MouseEvent) => void
};
type State = {};

@observer
export class RangeSelection extends React.PureComponent<Props, State> {
    state = {
        position: {x: 0, y: 0},
        size: {width: 0, height: 0}
    };

    static defaultProps = {
        handleMouseUp: () => {}
    };

    static getDerivedStateFromProps(props, state) {
        const position = props.position;
        if ( position !== state.position){
            return {position, size: position? state.size: {width: 0, height: 0}}
        }
        return null;
    }

    componentDidMount() {
        window.addEventListener("mouseup", this.handleMouseUp);
        window.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener("mouseup", this.handleMouseUp);
        window.removeEventListener("mousemove", this.handleMouseMove);
    }


    handleMouseUp = (event: MouseEvent) => {
        let that = this;
        that.props.handleMouseUp();
    };

    handleMouseMove = (event: MouseEvent) => {
        let that = this;
        const {position} = that.state;
        if ( !position) return;
        const {pageX, pageY} = event;
        const size = {
            width: Math.abs(pageX - position.x),
            height: Math.abs(pageY - position.y)
        };
        console.log(size);
        that.setState({size});
    };

    render() {
        let that = this;
        const { size} = that.state;
        const position = that.state.position || {x: 0, y: 0};
        const rangeStyle = { top: position.y, left: position.x, width: size.width, height: size.height };
        // return !size.width || !size.width && <div className={"range-selection"} style={rangeStyle}/>;
        return  <div className={"range-selection"} style={rangeStyle}/>;
    }
}
