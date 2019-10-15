/**
 * 布局Layout属性
 * @author tangzehua
 * @sine 2019-10-15 15:05
 */

// @flow
import React from 'react';
import {Form} from "fr-ui";
import {IBotForm} from 'fr-web';
import '../assets/layout.pcss';

type Props = {

};
type State = {

};

export class LayoutItem extends Form.BaseItem<Props, State> {

    render() {
        let that = this;
        let { item } = that.props;
        const { value = {} } = that.state;

        return (
            <div className={"item-layout"}>
                <header>
                    <p className={"title"}>{item.title}</p>
                </header>
                <section>
                    <div className={"bg-content"}>
                        <div>
                            <span>align-items</span>
                            <div>
                                <IBotForm.PanelSelect />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    };
}

