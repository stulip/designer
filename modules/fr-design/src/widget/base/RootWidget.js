/**
 *
 * @author tangzehua
 * @sine 2019-11-20 13:42
 */

// @flow
import React from "react";
import {BaseWidget} from "./BaseWidget";

type Props = {};
type State = {};

export class RootWidget extends BaseWidget<Props, State> {

    addListener() {
        // 不处理事件
    }

    handleMouseDown = (event: MouseEvent) => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey) return;
        event.stopPropagation();
        event.preventDefault();
    };

    render() {
        const that = this;
        const {children, designRect, canvasRect} = this.props;

        return (
            <div
                className={`group-list group-content ${designRect.type}`}
                onMouseDown={that.handleMouseDown}
                ref={that.widgetRef}
            >
                {that.renderChild()}
            </div>
        );
    }
}
