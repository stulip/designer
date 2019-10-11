/**
 *
 * @author tangzehua
 * @sine 2019-10-11 11:02
 */

// @flow
import React, {Fragment} from 'react';

export type BaseWidgetProps = {
    onMouseExit ?: (event: MouseEvent)=> void,
    onMouseEnter ?: (event)=> void,
};
type State = {

};

export class BaseWidget extends React.Component<BaseWidgetProps, State> {

    widgetRef = React.createRef();

    get widget (){
        return this.widgetRef.current;
    }

    static defaultProps = {
        onMouseExit: ()=> {},
        onMouseEnter: ()=> {}
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelect: false, //是否为选中状态
        }
    }

    componentDidMount() {
        const that = this;
        that.widget.addEventListener("mouseleave", that.handleMouseLeave);
        that.widget.addEventListener("mouseenter", that.handleMouseEnter);
    }

    componentWillUnmount() {
        const that = this;
        that.widget.removeEventListener('mouseleave', that.handleMouseLeave);
        that.widget.removeEventListener('mouseenter', that.handleMouseEnter);
    }

    handleMouseEnter = (event: MouseEvent): void => {
        this.props.onMouseEnter(event);
    };

    handleMouseLeave = (event: MouseEvent): void => {
        this.props.onMouseExit(event);
    };

    // 子类实现
    renderWidget (){ }

    render() {
        let that = this;
        return (
            <div className={'group-flow'} ref={that.widgetRef}>
                {that.renderWidget()}
            </div>
        );
    };
}
