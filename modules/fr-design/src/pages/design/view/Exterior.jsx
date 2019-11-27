/**
 * 外观属性
 * @author tangzehua
 * @sine 2019-09-26 17:18
 */

// @flow
import * as React from "react";
import "../assets/exterior.pcss";
import {Form} from "fr-ui";
import {IBotSVG} from "fr-web";
import {observer} from "mobx-react";
import {AttributeStore} from "../store/AttributeStore";
import {toJS} from "mobx";

type Props = {
    store: AttributeStore
};

type State = {};

@observer
export class Exterior extends React.Component<Props, State> {
    componentDidMount() {
        this.props.store.mount();
    }

    componentWillUnmount() {
        this.props.store.unmount();
    }

    renderArrange = item => {
        const store = this.props.store;
        return (
            <a
                className={"item"}
                key={item.type}
                disabled={item.disable}
                onClick={store.onArrangeClick}
                data-type={item.type}
            >
                <IBotSVG name={item.icon} />
            </a>
        );
    };

    _render() {
        let that = this;
        const store = that.props.store;
        const config = toJS(store.formConfig);
        return (
            <>
                {/*<div className={"arrange"}>{ArrangeConfig.map(that.renderArrange)}</div>*/}
                <main className={"ds-attribute"}>
                    <Form.View
                        config={config}
                        ref={store.formRef}
                        formData={store.formData}
                        onChange={store.onFormChange}
                    />
                </main>
            </>
        );
    }

    render() {
        return this._render();
    }
}
