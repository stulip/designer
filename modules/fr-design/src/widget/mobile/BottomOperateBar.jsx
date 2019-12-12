/**
 * iPhone X底部操作条
 * @author tangzehua
 * @sine 2019-10-10 10:49
 */

// @flow
import React from "react";
import "../assets/mobile/iphonex-operate-bar.pcss";
import type {BaseWidgetProps} from "../base";
import {BaseWidget} from "../base";
import {WidgetConst} from "../config";

type Props = {
    ...BaseWidgetProps
};

/**
 * @return {null}
 */
export class BottomOperateBar extends BaseWidget<Props> {
    getName(): * {
        return "iPhone 操作条";
    }

    render() {
        const {canvasRect, designRect, cid} = this.props;
        if (designRect.bottom === 0) return null;
        const width = canvasRect.width;
        const height = designRect.bottom;

        return (
            <div className="group-item" style={{bottom: 0, width, height}} data-cid={cid}>
                <div
                    className="widget operate_bar hcenter vmiddle iphone_x_operate_bar"
                    style={{width, height}}
                >
                    <div className="rounded-bar">
                        <div className="text" style={{padding: 0}}>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BottomOperateBar.displayName = WidgetConst.App.BottomOperateBar;
