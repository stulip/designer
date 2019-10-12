/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:30
 */
import * as React from "react";
import {Rules} from "./Rules";
import {ScrollBar} from "./ScrollBar";
import {observer} from "mobx-react";
import {SectionStore} from "../store/SectionStore";

type Props = {
    store: SectionStore
};
type State = {};

@observer
export class Section extends React.Component<Props, State> {
    resize = event => {
        this.setContentSize(event.currentTarget);
    };

    componentDidMount() {
        let that = this;
        const store = this.props.store;
        let win = that.iframe.contentWindow;
        win.onresize = that.resize;
        that.setContentSize(win);
        // store.sectionRef.current.addEventListener()
    }

    setContentSize(win: window) {
        let that = this;
        const { innerWidth, innerHeight } = win;
        that.props.store.setContentSize(innerWidth, innerHeight);
    }

    _render() {
        const that = this;
        const store = this.props.store;
        return (
            <section className={"art-board"} ref={store.sectionRef}>
                {/*<div className={"prev-page float-btn dark"}>*/}
                {/*    <IBotIcon type={"dora"} name={"arrow_up"} />*/}
                {/*    <span>返回工作区</span>*/}
                {/*</div>*/}
                {/*<div className={"prev-page float-btn"}>*/}
                {/*    <span className={"dot"} />*/}
                {/*    <span>链接上一页</span>*/}
                {/*</div>*/}
                <Rules store={store} />
                <ScrollBar
                    x={store.scrollPosition.x}
                    y={store.scrollPosition.y}
                    size={store.scrollBarSize}
                    handleBarMove={store.handleScrollBarMove}
                />
                <iframe className={"vp-iframe"} ref={rf => (that.iframe = rf)} />
            </section>
        );
    }

    render() {
        return this._render();
    }
}
