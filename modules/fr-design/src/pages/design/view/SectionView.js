/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:30
 */
import * as React from "react";
import { IBotIcon } from "fr-web";
import { Rules } from "./Rules";
import { ScrollBar } from "./ScrollBar";
import { observer } from "mobx-react";
import { action } from "mobx";
import { SectionStore } from "../store/SectionStore";

type Props = {
    store: SectionStore
};
type State = {};

@observer
export class SectionView extends React.Component<Props, State> {

    resize = event => {
        this.setContentSize(event.currentTarget);
    };

    componentDidMount() {
        let win = this.iframe.contentWindow;
        win.onresize = this.resize;
        this.setContentSize(win);
    }

    setContentSize (win: window){
        let that = this;
        const { innerWidth, innerHeight } = win;
        that.props.store.setContentSize(innerWidth, innerHeight)
    }

    _render() {
        const that = this;
        const store = this.props.store;
        return (
            <section className={"art-board"}>
                <div className={"prev-page float-btn dark"}>
                    <IBotIcon type={"dora"} name={"arrow_up"} />
                    <span>返回工作区</span>
                </div>
                <div className={"prev-page float-btn"}>
                    <span className={"dot"} />
                    <span>链接上一页</span>
                </div>
                <Rules store={store} />
                <ScrollBar x={store.scroll.x} y={store.scroll.y} size={store.scrollBarSize}/>
                <iframe className={"vp-iframe"} ref={rf => (that.iframe = rf)} />
            </section>
        );
    }

    render() {
        return this._render();
    }
}
