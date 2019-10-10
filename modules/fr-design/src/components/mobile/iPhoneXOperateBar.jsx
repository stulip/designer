/**
 * iPhone X底部操作条
 * @author tangzehua
 * @sine 2019-10-10 10:49
 */

// @flow
import React from "react";
import "../assets/iphonex-operate-bar.pcss";

type Props = {
    width: number,
    height: number,
    designHeight: number
};

/**
 * @return {null}
 */
export function IPhoneXOperateBar(props: Props) {
    const { width, height, designHeight, scale } = props;
    if (height === 0) return null;

    return (
        <div className="group-item" style={{ top: designHeight - height, left: 0, width, height, zIndex: 4 }}>
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
