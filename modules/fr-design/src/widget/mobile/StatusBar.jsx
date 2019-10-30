/**
 * Mobile 状态条
 * @author tangzehua
 * @sine 2019-10-10 09:59
 */

// @flow
import React from "react";
import {SVG} from "fr-ui";
import "../assets/mobile/status-bar.pcss";
import {BaseWidget} from "../base/BaseWidget";
import {ItemConst} from "../../components";
import {PropsConst} from "../../config/Attribute";

type Props = {
    width: number,
    height: number
};

export class StatusBar extends BaseWidget<Props> {

    getName(): string {
        return "状态栏";
    }

    getDefaultConfig(): {} {
        return {
            ...super.getDefaultConfig(),
            [PropsConst.widgetBackground]: "#f8f8f8"
        }
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
                handlePicker: PropsConst.widgetColorHandle,
            },
        ]
    }

    render() {
        const that = this;
        const {canvasRect, designRect, cid} = that.props;
        if (designRect.bottom === 0) return null;

        const data = that.getFormData();
        const width = canvasRect.width;
        const height = designRect.top;
        const backgroundColor = data[PropsConst.widgetBackground];

        return (
            <div className="group-flow" style={{width, height, backgroundColor}} ref={that.widgetRef} data-cid={cid}>
                <div className="status-bar" style={{width, height}}>
                    <div className="mobile-status-bar">
                        <div className="time">12:00</div>
                        <div className="signal">{SVG.status_bar_signal()}</div>
                        <div className="wifi">{SVG.status_bar_wifi()}</div>
                        <div className="battery">{SVG.status_bar_battery()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
