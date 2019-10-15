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
        const { themeColor, preferenceConfig, showSetting, setPreferenceAction, setPreferenceConfig } = this.props.store;
        console.log(this.props.store, "---sdf");
        return (
            <div className={'ds-footer'}>
                <span>网页、App设计</span>
                <span className={`preference-setting ${showSetting ? "active": ""}`} onClick={setPreferenceAction}>
                    <IBotSVG icon={undefined} name="design/preference" />
                    偏好设置
                </span>
                { showSetting && <div className={'setting-plate'}>
                        <div className={"plate"}>
                            <span>主题</span>
                            <span>{themeColor.map(kk => <b key={kk.class} className={`square ${kk.class} ${kk.class == preferenceConfig[kk.type] ? "is-active": "" }`} onClick={() => setPreferenceConfig(kk.type, kk.class)} />)}</span>
                        </div>
                        <div className={"plate"}>
                            <span>标尺</span>
                            <label className={`switch ${preferenceConfig.isScale ? "is-checked": ""}`} onClick={() => setPreferenceConfig("isScale", !preferenceConfig.isScale)}>
                                <strong></strong>
                            </label>
                        </div>

                        <span style={{ marginTop: "10px"}}>工具栏文字</span>
                        <div className={"plate"} style={{ marginTop: "-5px"}}>
                            <span className={"sub-title"}>显示工具栏工具标签文字</span>
                            <label className={`switch ${preferenceConfig.isToolbar ? "is-checked": ""}`} onClick={() => setPreferenceConfig("isToolbar", !preferenceConfig.isToolbar)}>
                                <strong></strong>
                            </label>
                        </div>
                    </div> }
            </div>
        );
    };
};
