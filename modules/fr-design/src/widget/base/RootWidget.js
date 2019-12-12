/**
 *
 * @author tangzehua
 * @sine 2019-11-20 13:42
 */

// @flow
import React from "react";
import {BaseWidget} from "./BaseWidget";
import {RootConfig} from "./root.config";
import {PropsConst, StatesConst} from "../../config";
import {DesignEvent} from "fr-design";

type Props = {};
type State = {};

const displayName = "root.widget";

export class RootWidget extends BaseWidget<Props, State> {
    static displayName = displayName;

    getName(): * {
        return displayName;
    }

    widgetProps(child: Array<WidgetProps> = []): Array<WidgetProps> {
        const {canvasRect, designRect} = this.props;
        return RootConfig({canvasRect, designRect});
    }

    componentDidMount() {
        super.componentDidMount();
        setTimeout(() => {
            DesignEvent.emit(PropsConst.rootWidgetInit, this);
        }, 0);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cid !== this.props.cid) {
            this.resetWidget();
        }
    }

    /**
     * 重置widget, 切换页面的时候
     */
    resetWidget() {
        const that = this;
        that.init();
        that.forceUpdate(() => {
            DesignEvent.emit(PropsConst.rootWidgetInit, that);
        });
    }

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

    // 始终返回默认数据
    getFormData(): * {
        return this.stateData[StatesConst.default.cid].props;
    }

    render() {
        const that = this;
        const {children, designRect, canvasRect, isPreview} = this.props;

        const pStyle = {};
        if (isPreview) {
            const data = that.getFormData();
            pStyle.backgroundColor = data[PropsConst.background];
        }

        return (
            <div className={`group-list group-root ${designRect.type}`} ref={that.widgetRef} style={pStyle}>
                {that.renderChild()}
            </div>
        );
    }
}
