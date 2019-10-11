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
import {BasicAttr} from "../components";
import {AttributeStore} from "../store/AttributeStore";

type Props = {
    store: AttributeStore
};

type State = {};


@observer
export class Exterior extends React.Component<Props, State> {

    renderArrange = item => {
        return (
            <a className={"item"} key={item.type} disabled={item.disable}>
                <IBotSVG name={item.icon}  />
            </a>
        );
    };

    _render() {
        let that = this;
        const store = that.props.store;
        return (
            <>
                <div className={"arrange"}>{ArrangeConfig.map(that.renderArrange)}</div>
                <main>
                    <BasicAttr store={store}/>
                </main>
            </>
        );
    }

    render() {
        return this._render();
    }
}
