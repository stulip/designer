/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:27
 */
import {observable, action, computed, toJS} from 'mobx';
import type {MainStore} from "../../../flow/Main.flow";
import {BaseStore} from "./BaseStore";

type ThemeCube = {
    type: string,
    color: string,
    class: string
}

type PreferenceConfig = {
    theme: string,
    isScale: boolean,
    isToolbar: boolean
}

export class FooterStore extends BaseStore {

    themeColor: ThemeCube[] = [
        { color: "#C8CDD1", class: "white", type: "theme" },
        { color: "#c8cdd0", class: "grey", type: "theme" }
    ];

    @observable
    _preferenceConfig: PreferenceConfig = {
        theme: "white",
        isScale: this.main.section.isShowRuler,
        isToolbar: this.main.toolbar.showToolbar
    };

    @observable
    showSetting: boolean = false;

    @action
    setPreferenceAction = () => {
        this.showSetting = !this.showSetting;
    };

    // 是否标尺
    @action
    setIsScale = () => {
        this.main.section.handleShowRuler();
        this._preferenceConfig["isScale"] = !this._preferenceConfig["isScale"];
    };

    // toolbar
    @action
    setIsToolbar = () => {
        this.main.toolbar.showOrHideToolbar();
        this._preferenceConfig["isToolbar"] = !this._preferenceConfig["isToolbar"];
    };

    @action
    setPreferenceConfig = (key, value) => {
        this._preferenceConfig[key] = value;
    };

    @computed
    get preferenceConfig(): PreferenceConfig {
        return toJS(this._preferenceConfig);
    }

}
