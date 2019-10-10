/**
 * iPhone X底部操作条
 * @author tangzehua
 * @sine 2019-10-10 10:49
 */

// @flow
import React from "react";
import "../assets/operate-bar.pcss";

type Props = {
    width: number,
    height: number,
    designHeight: number,
};

export function OperateBar(props: Props) {
    const { width, height, designHeight, scale } = props;
    return (
        <div className="group-item" style={{ top: designHeight - height, left: 0, width, height, zIndex: 4 }}>
            <div
                className="widget operate_bar hcenter vmiddle"
                style={{
                    width,
                    height,
                    left: 0,
                    zIndex: 4,
                    borderColor: "transparent",
                    fontWeight: "normal",
                    fontSize: "normal",
                    opacity: 1,
                    transform: "rotate(0deg)"
                }}
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
