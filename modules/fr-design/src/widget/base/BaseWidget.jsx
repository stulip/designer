/**
 *
 * @author tangzehua
 * @sine 2019-10-11 11:02
 */

// @flow
import React, {Fragment} from 'react';

export type BaseWidgetProps = {
    onMouseExit ?: (event: MouseEvent)=> void,
    onMouseEnter ?: (event: MouseEvent)=> void,
    onClick ?: (event: MouseEvent)=> void,
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
        onMouseEnter: ()=> {},
        onClick: ()=> {}
    };

    constructor(props) {
        super(props);
        let that = this;
        this.state = {

        }
    }

    componentDidMount() {
        const that = this;
        that.widget.addEventListener("mouseleave", that.handleMouseLeave);
        that.widget.addEventListener("mouseenter", that.handleMouseEnter);
        that.widget.addEventListener("click", that.handleClick);
    }

    componentWillUnmount() {
        const that = this;
        that.widget.removeEventListener('mouseleave', that.handleMouseLeave);
        that.widget.removeEventListener('mouseenter', that.handleMouseEnter);
        that.widget.removeEventListener('click', that.handleClick);
    }

    handleMouseEnter = (event: MouseEvent): void => {
        this.props.onMouseEnter(event);
    };

    handleMouseLeave = (event: MouseEvent): void => {
        this.props.onMouseExit(event);
    };

    handleClick = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onClick(event, this);
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
