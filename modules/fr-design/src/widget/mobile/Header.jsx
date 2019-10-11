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

const backImage = require('fr-art/design/back_chevron.png');
export function Header(props: Props) {
    const { height, width } = props;
    return (
        <div className="group-flow" style={{ width, height, zIndex: 3 }}>
            <div className="header-bar" style={{ width, height }}>
                <div className={'header-left flex middle'}>
                    <img src={backImage} width={15}/>
                    <span className="text">返回</span>
                </div>
                <span className="header-title">首页</span>
                <div className={'header-right'}>
                    <span className="text">菜单</span>
                </div>
            </div>
        </div>
    );
}
