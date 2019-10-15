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
import {ItemConst} from "../../pages/design/components/item";
import {PropsConst} from "../../config/Attribute";

type Props = {
    width: number,
    height: number
};

export class StatusBar extends BaseWidget<Props> {

    getName(): string {
        return "状态栏";
    }

    initWidgetFormData(): * {
        const formData = super.initWidgetFormData();
        formData[PropsConst.widgetBackground] = "#f8f8f8";
        return formData;
    }

    widgetProps(): Array<Object> {
        const config = super.widgetProps();
        return [
            ...config,
            {
                title: "背景颜色",
                type: ItemConst.Type.Background,
                form: PropsConst.widgetBackground,
                listener: PropsConst.widgetBackground,
                handlePicker: PropsConst.widgetBackgroundHandle,
            },
        ]
    }

    render() {
        const that = this;
        const { canvasRect, designRect } = that.props;
        const data = that.formData;
        const width = canvasRect.width;
        const height = designRect.top;
        const backgroundColor = data[PropsConst.widgetBackground];

        return (
            <div className="group-flow" style={{ width, height, backgroundColor}} ref={that.widgetRef}>
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
