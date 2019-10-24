/**
 * iPhone X底部操作条
 * @author tangzehua
 * @sine 2019-10-10 10:49
 */

// @flow
import React from "react";
import "../assets/mobile/iphonex-operate-bar.pcss";
import type { BaseWidgetProps } from "../base/BaseWidget";
import { BaseWidget } from "../base/BaseWidget";

type Props = {
    ...BaseWidgetProps
};

/**
 * @return {null}
 */
export class BottomOperateBar extends BaseWidget<Props> {
    render() {
        const { canvasRect, designRect } = this.props;
        if (designRect.bottom === 0) return null;
        const width = canvasRect.width;
        const height = designRect.bottom;

        return (
            <div className="group-item" style={{ bottom: 0, width, height, zIndex: 99 }}>
                <div
                    className="widget operate_bar hcenter vmiddle iphone_x_operate_bar"
                    style={{ width, height }}
                >
                    <div className="rounded-bar">
                        <div className="text" style={{ padding: 0 }}>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
