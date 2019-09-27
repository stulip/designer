/**
 * 外观属性
 * @author tangzehua
 * @sine 2019-09-26 17:18
 */

// @flow
import * as React from "react";
import "../assets/exterior.pcss";
import { Form } from "fr-ui";
import { IBotSVG } from "fr-web";
import { ArrangeConfig } from "../../../config/Attribute";
import {observer} from "mobx-react";

type Props = {};
type State = {};


@observer
export class Exterior extends React.Component<Props, State> {

    createEditConfig (){
        let store = this.props.store;
        const {canvasRect} = store.main.section;
        return [
            [
                {
                    form: "width",
                    type: Form.Const.Type.ConfirmInputNumber,
                    value: canvasRect.width,
                    input: {
                        title: "宽",
                        disabled: true,
                    },
                },
                {
                    form: "height",
                    type: Form.Const.Type.ConfirmInputNumber,
                    value: canvasRect.height,
                    input: {
                        title: "高"
                    },
                    onChange: v => console.log(v)
                }
            ]
        ]
    }
    renderArrange = item => {
        return (
            <a className={"item"} key={item.type} disabled={item.disable}>
                <IBotSVG name={item.icon}  />
            </a>
        );
    };

    _render() {
        return (
            <>
                <div className={"arrange"}>{ArrangeConfig.map(this.renderArrange)}</div>
                <main>
                    <div className={"appearance-panel"}>
                        <Form.View config={this.createEditConfig()} />
                    </div>
                </main>
            </>
        );
    }

    render() {
        return this._render();
    }
}
