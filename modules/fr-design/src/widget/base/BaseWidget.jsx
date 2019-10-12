/**
 *
 * @author tangzehua
 * @sine 2019-10-11 11:02
 */

// @flow
import React, {Fragment} from 'react';
import {DesignEvent} from "fr-web";
import {EventConst} from "../../config/Attribute";
import {Form} from "fr-ui";

export type BaseWidgetProps = {

};
type State = {

};

export class BaseWidget extends React.Component<BaseWidgetProps, State> {

    // 所有属性
    formData: Object;
    widgetRef = React.createRef();
    get widget (){
        return this.widgetRef.current;
    }

    constructor(props) {
        super(props);
        let that = this;
        this.state = {

        }
    }

    componentDidMount() {
        const that = this;
        if ( !that.widget) return;
        that.widget.addEventListener("mouseleave", that.handleMouseLeave);
        that.widget.addEventListener("mousedown", that.handleMouseDown);
        that.widget.addEventListener("mouseover", that.handleMouseEnter);
        that.widget.addEventListener("click", that.handleClick);
        that.widget.addEventListener("dblclick", that.handleDBLClick);
    }

    componentWillUnmount() {
        const that = this;
        if ( !that.widget) return;
        that.widget.removeEventListener('mouseleave', that.handleMouseLeave);
        that.widget.removeEventListener("mousedown", that.handleMouseDown);
        that.widget.removeEventListener('mouseover', that.handleMouseEnter);
        that.widget.removeEventListener('click', that.handleClick);
        that.widget.removeEventListener('dblclick', that.handleDBLClick);
    }

    handleMouseDown = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
    };

    /**
     * 获得鼠标焦点
     * @param event
     */
    handleMouseEnter = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        DesignEvent.emit(EventConst.widgetMouseEnter, event, this);
    };

    /**
     * 失去鼠标焦点
     * @param event
     */
    handleMouseLeave = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        DesignEvent.emit(EventConst.widgetMouseExit, event, this);
    };

    /**
     * 元素被点击
     * @param event
     */
    handleClick = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        DesignEvent.emit(EventConst.widgetMouseClick, event, this)
    };

    /**
     * 双击事
     * @param event
     */
    handleDBLClick = (event: MouseEvent): void => {
        DesignEvent.emit(EventConst.widgetMouseDBLClick, event, this);
    };

    /**
     * widget 属性, 子类实现
     * @returns Array<Object>
     */
    widgetProps (){
        return [
            {
                form: 'name',
                type: Form.Const.Type.ConfirmInputNumber,
            }
        ];
    }

    // 子类实现
    renderWidget (){
        return this.props.children;
    }

    render() {
        let that = this;
        return (
            <div className={'group-flow'} ref={that.widgetRef}>
                {that.renderWidget()}
            </div>
        );
    };
}
