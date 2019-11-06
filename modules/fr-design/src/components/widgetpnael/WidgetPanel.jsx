/**
 * widget 列表 面板
 * @author tangzehua
 * @sine 2019-11-06 11:26
 */

// @flow
import React from 'react';
import './assets'
import {SVG} from "fr-ui";
import {IBotSVG} from "fr-web";
import {basicWidgets} from "../../config/WIdgetConfig";
import type {BasicWidgetDefined} from "../../flow/Main.flow";

type Props = {};
type State = {};

export class WidgetPanel extends React.Component<Props, State> {

    renderBasic = (item: BasicWidgetDefined) => {
        const {title, guideId, svg} = item;
        return (
            <li key={guideId} data-guide-id={guideId}>
                <div className={'widget-icon-wrapper'}>
                    <IBotSVG name={svg}/>
                </div>
                <span>{title}</span>
            </li>
        )
    };

    _render() {
        const that = this;
        return (
            <>
                <header/>
                <main className={'widget-panel'}>
                    <header>
                        <IBotSVG icon={SVG.arrow_right2} className={"arrow-icon"}/>
                        <span className={'title'}>基础</span>
                    </header>
                    <div>
                        <ul className={'widget-item-list basic'}>
                            {basicWidgets.map(that.renderBasic)}
                        </ul>
                    </div>
                </main>
            </>
        );
    };

    render() {
        return this._render();
    }
}
