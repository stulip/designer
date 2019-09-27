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

type Props = {};
type State = {};

const BasisConfig = [
    [
        {
            form: "width",
            type: Form.Const.Type.ConfirmInputNumber,
            value: "100",
            input: {
                title: "宽"
            }
        },
        {
            form: "height",
            type: Form.Const.Type.ConfirmInputNumber,
            value: "20",
            input: {
                title: "高"
            }
        }
    ]
];

export class Exterior extends React.Component<Props, State> {
    renderArrange = item => {
        return (
            <a className={"item"} key={item.type}>
                <IBotSVG name={item.icon} />
            </a>
        );
    };

    _render() {
        return (
            <>
                <div className={"arrange"}>{ArrangeConfig.map(this.renderArrange)}</div>
                <main>
                    <div className={"appearance-panel"}>
                        <Form.View config={BasisConfig} />
                    </div>
                </main>
            </>
        );
    }

    render() {
        return this._render();
    }
}
