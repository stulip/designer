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
};
type State = {};

export class DragWidget extends React.Component<Props, State> {

    handleMouseDown = (event: MouseEvent) => {
        const that = this;
        if (event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();

        const {pageX, pageY} = event;
        const {item} = that.props;
        console.log(item)
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
