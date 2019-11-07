/**
 * widget 列表 面板
 * @author tangzehua
 * @sine 2019-11-06 11:26
 */

// @flow
import React from "react";
import "./assets";
import {SVG} from "fr-ui";
import {IBotSVG} from "fr-web";
import type {DragWidgetDefined} from "../../flow/Main.flow";
import {DragWidget} from "./DragWidget";
import {AppWidgets, BasicWidgets, WebWidgets} from "../../widget/WidgetConfig";

type Props = {
    isApp: boolean,
    onDragStart: (event: MouseEvent, widgetId: string, item: DragWidgetDefined) => void,
    onDragMove: (event: MouseEvent, widgetId: string, item: DragWidgetDefined) => void,
    onDragEnd: (event: MouseEvent, widgetId: string, item: DragWidgetDefined) => void
};
type State = {};

export class WidgetPanel extends React.PureComponent<Props, State> {

    renderWidget = (item: DragWidgetDefined) => {
        const {isApp, onDragStart, onDragEnd, onDragMove} = this.props;
        const {appId, webId} = item;
        const widgetId = isApp ? appId : webId;
        return (
            <DragWidget
                key={item.guideId}
                item={item}
                widgetId={widgetId}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragMove={onDragMove}
            />
        );
    };

    renderApp() {
        const that = this;
        return (
            <>
                <div>
                    <header/>
                    <main className={"widget-panel"}>
                        <header>
                            <IBotSVG icon={SVG.arrow_right2} className={"arrow-icon"}/>
                            <span className={"title"}>App</span>
                        </header>
                        <div>
                            <ul className={"widget-item-list basic"}>{AppWidgets.map(that.renderWidget)}</ul>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    renderWeb() {
        const that = this;
        return (
            <>
                <div>
                    <header/>
                    <main className={"widget-panel"}>
                        <header>
                            <IBotSVG icon={SVG.arrow_right2} className={"arrow-icon"}/>
                            <span className={"title"}>Web</span>
                        </header>
                        <div>
                            <ul className={"widget-item-list basic"}>{WebWidgets.map(that.renderWidget)}</ul>
                        </div>
                    </main>
                </div>
            </>
        );
    }

    _render() {
        const that = this;
        const {isApp} = that.props;
        return (
            <>
                <div>
                    <header/>
                    <main className={"widget-panel"}>
                        <header>
                            <IBotSVG icon={SVG.arrow_right2} className={"arrow-icon"}/>
                            <span className={"title"}>基础</span>
                        </header>
                        <div>
                            <ul className={"widget-item-list basic"}>{BasicWidgets.map(that.renderWidget)}</ul>
                        </div>
                    </main>
                </div>
                {(isApp && that.renderApp()) || that.renderWeb()}
            </>
        );
    }

    render() {
        return this._render();
    }
}
