/**
 *
 * @author tangzehua
 * @sine 2019-11-06 15:00
 */

// @flow
import React from 'react';
import {classNames, IBotSVG, IBotTooltip} from "fr-web";
import {SlideBarConfig} from "../store/WidgetsStore";
import '../assets/widgetbar.pcss'
import {observer} from "mobx-react";

type Props = {};
type State = {};

@observer
export class WidgetBar extends React.Component<Props, State> {

    renderTips(title, keyboard) {
        return (
            <>
                <div className="left">{title}</div>
                <div className="right">{keyboard}</div>
            </>
        );
    }

    renderBarItem = (data, index) => {
        let that = this;
        let store = this.props.store;
        const {name, tip, keyboard} = data;
        const tipDOM = keyboard ? that.renderTips(tip, keyboard) : tip;
        const active = name === store.slideActiveType || (index === 0 && store.stateSlideActive);
        return (
            <IBotTooltip
                key={data.name}
                content={tipDOM}
                arrowed={false}
                type={"link"}
                className={classNames('nav-button', {active}, data.className)}
                tipClassName={keyboard && "widget"}
                onClick={store.handleSlideActive}
                data-type={name}
                position={"left"}
                theme={"core"}
                delay={0}
            >
                <IBotSVG icon={data.svg} name={data.svgName}/>
                {index === 0 && <span className={'nav-line'}/>}
            </IBotTooltip>
        );
    };

    render() {
        let that = this;
        let store = this.props.store;
        return (
            <div className={"widget-slide-bar"}>
                {SlideBarConfig.map(this.renderBarItem)}
            </div>
        );
    };
}
