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
import {observer} from "mobx-react";

type Props = {
    ...BaseWidgetProps,
};

const backImage = require('fr-art/design/back_chevron.png');

export class Header extends BasePanel<Props> {

    getName(): string {
        return "导航栏";
    }

    getBasicConfig(): boolean {
        let that = this;
        const {canvasRect, designRect} = that.props;
        const basic = super.getBasicConfig();
        basic.widgetWidth.disabled = true;
        return basic;
    }

    initWidgetFormData(): * {
        const {canvasRect, designRect} = this.props;
        const formData = super.initWidgetFormData();
        formData['widget.width'] = canvasRect.width;
        formData['widget.height'] = designRect.nav_height;
        return formData;
    }

    widgetProps(): [] {
        const that = this;
        const config = super.widgetProps();
        return [
            ...config,
            {
                form: 'title',
                type: Form.Const.Type.PanelInput,
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
        const data = that.formData ;
        const width = data['widget.width'];
        const height = data['widget.height'];
        return (
            <div className="group-flow" style={{width, height}} ref={that.widgetRef}>
                <div className="header-bar" style={{width, height}}>
                    <div className={'header-left flex middle'}>
                        <img src={backImage} width={15}/>
                        <span className="text">返回</span>
                    </div>
                    <span className="header-title">{data.title}</span>
                    <div className={'header-right'}>
                        <span className="text">菜单</span>
                    </div>
                </div>
            </div>
        );
    }
}
