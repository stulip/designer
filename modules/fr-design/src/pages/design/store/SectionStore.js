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

    handleWheel = event => {
        let that = this;
        const {deltaY, deltaX} = event;
        const y = that.scroll.y + deltaY / 1025;
        const x = that.scroll.x + deltaX / 1025;
        that.setScrollPosition(x, y);
    };

    handleCornerClick = ()=> {
        this.setScrollPosition(0.5, 0.5);
    };

    @action
    setScrollPosition (x: number, y: number){
        this.scroll.x = Math.max(Math.min(1, x), 0);
        this.scroll.y = Math.max(Math.min(1, y), 0);
    }
}
