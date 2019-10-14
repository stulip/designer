/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 14:13
 */

import React from 'react';
import { observer } from "mobx-react";
import { IBotSVG } from "fr-web";
import '../assets/footer.pcss'
import { FooterStore } from "../store/FooterStore";

type Props = {
    store: FooterStore
};
type State = {

};

@observer
export class Footer extends React.Component<Props, State> {

    componentWillUnmount() {
        this.props.store.unmount();
    }

    componentDidMount() {
        this.props.store.mount();
    }

    render() {
        return (
            <div className={'ds-footer'}>
                <span>网页、App设计</span>
                <span className={"preference-setting"} >
                    <IBotSVG icon={undefined} name="design/preference" />
                    偏好设置
                </span>
                <div className={'setting-plate'}>
                    设置具体内容，明天来写！！！
                </div>
            </div>
        );
    };
};
