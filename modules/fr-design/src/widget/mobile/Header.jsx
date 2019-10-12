/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from "react";
import '../assets/mobile/header.pcss'
import type {BaseWidgetProps} from "../base/BaseWidget";
import {BasePanel} from "../base/BasePanel";
import {Form} from "fr-ui";

type Props = {
    ...BaseWidgetProps,
    width: number,
    height: number
};

const backImage = require('fr-art/design/back_chevron.png');

export class Header extends BasePanel<Props> {

    widgetProps(): [] {
        const that = this;
        const config = super.widgetProps();
        return [
            ...config,
            {
                form: 'name2',
                type: Form.Const.Type.ConfirmInputNumber,
            }
            // {
            //     name: '标题',
            //     config: [
            //
            //     ]
            // }
        ];
    }

    render() {
        const that = this;
        const {height, width} = that.props;
        return (
            <div className="group-flow" style={{width, height}} ref={that.widgetRef}>
                <div className="header-bar" style={{width, height}}>
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
}
