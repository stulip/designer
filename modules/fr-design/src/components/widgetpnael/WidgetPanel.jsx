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
import type {DragWidgetDefined} from "../../flow/Main.flow";
import {DragWidget} from "./DragWidget";
import {AppWidgets, BasicWidgets} from "../../widget/WidgetConfig";

type Props = {
    isApp: boolean
};
type State = {};

export class WidgetPanel extends React.Component<Props, State> {

    renderWidget = (item: DragWidgetDefined) => {
        const {isApp} = this.props;
        const {appId, webId} = item;
        const widgetId = isApp ? appId : webId;
        return <DragWidget key={item.guideId} item={item} widgetId={widgetId}/>
    };

    _render() {
        const that = this;
        return (
            <>
                <div>
                    <header/>
                    <main className={'widget-panel'}>
                        <header>
                            <IBotSVG icon={SVG.arrow_right2} className={"arrow-icon"}/>
                            <span className={'title'}>基础</span>
                        </header>
                        <div>
                            <ul className={'widget-item-list basic'}>
                                {BasicWidgets.map(that.renderWidget)}
                            </ul>
                        </div>
                    </main>
                </div>
                <div>
                    <header/>
                    <main className={'widget-panel'}>
                        <header>
                            <IBotSVG icon={SVG.arrow_right2} className={"arrow-icon"}/>
                            <span className={'title'}>App</span>
                        </header>
                        <div>
                            <ul className={'widget-item-list basic'}>
                                {AppWidgets.map(that.renderWidget)}
                            </ul>
                        </div>
                    </main>
                </div>
            </>
        );
    };

    render() {
        return this._render();
    }
}
