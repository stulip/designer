/**
 * 设计器工具栏Store
 * @flow
 * @author tangzehua
 * @sine 2019-08-29 10:47
 */
import type {MainStore} from "./MainStore.flow";

export class ToolbarStore {
    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
    }
}
