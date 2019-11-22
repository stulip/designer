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
        const that = this;
        if (that.widget) {
            that.widget.addEventListener('mousedown', that.handleMouseDown);
        }
    }

    removeListener() {
        const that = this;
        if (that.widget) {
            that.widget.removeEventListener('mousedown', that.handleMouseDown);
        }
    }

    handleMouseDown = (event: MouseEvent) => {
        if (event.button !== 0 || event.ctrlKey || event.metaKey) return;
        if (event.target !== this.widget) {
            event.stopPropagation();
            event.preventDefault();
        }
    };

    getId() {
        return "root-widget";
    }

    render() {
        const that = this;
        const {children, designRect, canvasRect} = this.props;

        return (
            <div className={`group-list group-root ${designRect.type}`} ref={that.widgetRef}>
                {that.renderChild()}
            </div>
        );
    }
}
