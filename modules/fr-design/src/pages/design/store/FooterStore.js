/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:27
 */
import {observable, action, computed} from 'mobx';
import type {MainStore} from "../flow/Main.flow";

export class FooterStore {
    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
    }
}
