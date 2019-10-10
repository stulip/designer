/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from "react";
import '../assets/mobile/header.pcss'

type Props = {
    width: number,
    height: number
};

export function Header(props: Props) {
    const { height, width } = props;
    return (
        <div className="group-flow" style={{ width, height, zIndex: 3 }}>
            <div className="header-bar" style={{ width, height }}>
                <span className="header-left">返回</span>
                <span className="header-title">首页</span>
                <span className="header-right">菜单</span>
            </div>
        </div>
    );
}
