/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:28
 */

import React from "react";
import {classNames, IBotSVG, IBotTooltip} from "fr-web";
import {observer} from "mobx-react";
import {SlideBarConfig, WidgetsStore} from "../store/WidgetsStore";
import {Exterior} from "./Exterior";

type Props = {
    store: WidgetsStore
};
type State = {};

@observer
export class RightPanel extends React.Component<Props, State> {
    renderTips(title, keyboard) {
        return (
           <>
               <div className="left">{title}</div>
               <div className="right">{keyboard}</div>
           </>
        );
    }

    renderBarItem = data => {
        let that = this;
        let store = this.props.store;
        const { name, tip, keyboard } = data;
        const tipDOM = keyboard ? that.renderTips(tip, keyboard) : tip;
        return (
            <IBotTooltip
                key={data.name}
                content={tipDOM}
                arrowed={false}
                type={"link"}
                className={classNames('nav-button', {active: name === store.slideActiveType}, data.className)}
                tipClassName={keyboard && "widget"}
                onClick={store.handleSlideActive}
                data-type={name}
                position={"left"}
                theme={"core"}
                delay={0}
            >
                <IBotSVG icon={data.svg} name={data.svgName} />
            </IBotTooltip>
        );
    };

    _render() {
        let that = this;
        let store = this.props.store;
        const [widget, ...slideBars] = SlideBarConfig;
        return (
            <div className={"panel-right"}>
                <div className={"slide-bar"}>
                    {that.renderBarItem(widget)}
                    <span className={"line"} />
                    <div className={"nav-buttons"}>{slideBars.map(this.renderBarItem)}</div>
                </div>
                <div className={"content"}>
                    <Exterior store={store.main.attribute}/>
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
