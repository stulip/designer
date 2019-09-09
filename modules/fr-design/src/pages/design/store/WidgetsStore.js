/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:18
 */
import {observable, action, computed} from 'mobx';
import type {MainStore} from "./MainStore.flow";

export class WidgetsStore {

    // 左侧面板是否折叠
    @observable
    isToggle = false;
    // 左侧面板宽度
    @observable
    _leftPanelWidth = 0;
    // 左侧面板实际大小
    @observable
    leftPanelVXWidth = 240;

    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
    }

    @action.bound
    toggle (){
        this.isToggle = ! this.isToggle;
    }

    @computed
    get leftPanelWidth (){
        return this.isToggle? 0: this.leftPanelVXWidth;
    }

}
