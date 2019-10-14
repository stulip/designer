/**
 * Mobile 状态条
 * @author tangzehua
 * @sine 2019-10-10 09:59
 */

// @flow
import React, { Component } from "react";
import { status_bar_battery, status_bar_signal, status_bar_wifi } from "../../assets/svg";
import "../assets/mobile/status-bar.pcss";
import { BaseWidget } from "../base/BaseWidget";

type Props = {
    width: number,
    height: number
};

export class StatusBar extends BaseWidget<Props> {

    getName(): string {
        return "状态栏";
    }

    getBasicConfig(): boolean {
        const basic = super.getBasicConfig();
        basic.widgetWidth.disabled = true;
        basic.widgetHeight.disabled = true;
        return basic;
    }

    render() {
        const that = this;
        const { canvasRect, designRect } = that.props;
        const width = canvasRect.width;
        const height = designRect.top;
        return (
            <div className="group-flow" style={{ width, height }} ref={that.widgetRef}>
                <div className="status-bar" style={{ width, height }}>
                    <div className="mobile-status-bar">
                        <div className="time">12:00</div>
                        <div className="signal">{status_bar_signal()}</div>
                        <div className="wifi">{status_bar_wifi()}</div>
                        <div className="battery">{status_bar_battery()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
