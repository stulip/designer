/**
 * 控件面板,元素
 * @author tangzehua
 * @sine 2019-11-07 11:29
 */

// @flow
import React from 'react';
import type {DragWidgetDefined} from "../../flow/Main.flow";
import {IBotSVG} from "fr-web";

type Props = {
    item: DragWidgetDefined,
    widgetId: string,
    onDragStart: (event: MouseEvent, widgetId: string, item: DragWidgetDefined)=> void,
    onDragMove: (event: MouseEvent, widgetId: string, item: DragWidgetDefined)=> void,
    onDragEnd: (event: MouseEvent, widgetId: string, item: DragWidgetDefined)=> void,
};
type State = {};

export class DragWidget extends React.PureComponent<Props, State> {

    constructor(props) {
        super(props);
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
        const {item, widgetId, onDragEnd} = this.props;
        onDragEnd && onDragEnd(event, widgetId, item);
    };

    handleMouseMove = (event: MouseEvent) => {
        const that = this;
        const {item, widgetId, onDragMove} = that.props;
        onDragMove && onDragMove(event, widgetId, item);
    };

    handleMouseDown = (event: MouseEvent) => {
        const that = this;
        if (event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();
        that.addListener();

        const {item, widgetId, onDragStart} = that.props;
        onDragStart && onDragStart(event, widgetId, item);
    };

    renderWidget() {
        const that = this;
        const {title, guideId, svg} = that.props.item;
        return (
            <li key={guideId} data-guide-id={guideId} onMouseDown={that.handleMouseDown}>
                <div className={'widget-icon-wrapper'}>
                    <IBotSVG name={svg}/>
                </div>
                <span>{title}</span>
            </li>
        )
    }

    render() {
        return this.renderWidget();
    };
}
