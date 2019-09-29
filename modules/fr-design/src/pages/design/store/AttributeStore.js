/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-29 11:11
 */
import {observable, action, computed} from 'mobx';
import type {MainStore, Rect, Size} from "../../../flow/Main.flow";

export class AttributeStore {

    @observable
    basicFormData = {};

    main: MainStore;
    constructor(main: MainStore) {
        let that = this;
        that.main = main;
    }

    handleCanvasSize  = (size: Size) => {
        this.main.section.setCanvasSize(size.width, size.height);
    };

    handleBackground = (color: string) => {
        this.main.setBackgroundColor(color);
    }
}
