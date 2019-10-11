/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-10-10 10:25
 */
import {observable, action, computed} from 'mobx';
import type {MainStore} from "../../../flow/Main.flow";

export class ViewGroupStore {

    main: MainStore;
    constructor(main: MainStore) {
        this.main = main;
    }
}
