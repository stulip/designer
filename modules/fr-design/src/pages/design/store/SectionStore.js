/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:56
 */
import { observable, action, computed } from "mobx";
import type { MainStore } from "./MainStore.flow";

export class SectionStore {
    // viewport 尺寸
    @observable
    size = {
        width: 500,
        height: 500
    };

    // scroll bar 位置
    @observable
    scroll = {
        x: 0.5,
        y: 0.5
    };

    main: MainStore;
    constructor(main: MainStore) {
        this.main = main;
    }

    @action
    setContentSize(width: number, height: number) {
        this.size = { width, height };
    }

    @action
    handleWheel = event => {
        let that = this;
        console.log(event)
        const {deltaY, deltaX} = event;
        const y = ((that.scroll.y * 100 + deltaY) / 100);
        const x = ((that.scroll.x * 100 + deltaX) / 100);
        that.scroll.y = Math.max(Math.min(y, 1), 0);
        that.scroll.x = Math.max(Math.min(x, 1), 0);
    };
}
