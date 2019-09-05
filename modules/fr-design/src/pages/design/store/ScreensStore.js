/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:44
 */
import {observable, action, computed} from 'mobx';
import type {MainStore} from "./MainStore.flow";

export class ScreensStore {
    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
    }
}
