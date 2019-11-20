/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-08-28 16:49
 */
import React, {Component} from "react";
import "../assets/design.pcss";
import {Toolbar} from "./Toolbar";
import {Screens} from "./Screens";
import {Footer} from "./Footer";
import {Widgets} from "./Widgets";
import {RightPanel} from "./RightPanel";
import {LeftPanel} from "./LeftPanel";
import {Section} from "./Section";
import {observer} from "mobx-react";
import {MainStore} from "../store/MainStore";
import {ColorPicker, Dialog, PopupPanel} from "fr-ui";
import {StatesListView, WidgetPanel} from "../../../components";

@observer
export class Main extends Component {
    constructor(props) {
        super(props);
        let that = this;
        that.store = new MainStore(props);
    }

    componentDidCatch(error: Error, info: { componentStack: string }) {
        console.error(error, info);
    }

    componentDidMount() {
        let that = this;
        that.store.init(that.props);
        document.addEventListener("contextmenu", that.handleContextMenu);
        document.addEventListener("keydown", that.handleKeyboard);
        // document.addEventListener('keydown', that.handleKeyboardBan);
    }

    componentWillUnmount() {
        let that = this;
        that.store.keyEvents.removeAllListeners();
        document.removeEventListener("contextmenu", that.handleContextMenu);
        document.removeEventListener("keyup", that.handleKeyboard);
        that.store.removeListener();
    }

    handleKeyboard = (event: KeyboardEvent) => {
        const eventNames = this.store.keyEvents.eventNames();
        if (eventNames.includes(String(event.keyCode)) && (event.ctrlKey || event.metaKey || event.altKey)) {
            event.preventDefault();
        }
        if (event.target.nodeName === "INPUT") {
            return;
        }
        // console.log(event.keyCode);
        this.store.keyEvents.emit(String(event.keyCode), event);
    };

    handleContextMenu = (event: MouseEvent) => {
        event.preventDefault();
    };

    renderContext() {
        let store = this.store;
        return (
            <div className={"ds-content"}>
                <Screens store={store.screens} />
                <Widgets store={store.widgets} />
                <LeftPanel store={store.widgets} />
                <main className={"ds-viewport"}>
                    <Section store={store.section} />
                    <Footer store={store.footer} />
                </main>
                <RightPanel store={store.widgets} />
            </div>
        );
    }

    renderSlidePanel() {
        let store = this.store;
        const {
            slideActiveType,
            handleSlidePanelClose,
            stateSlideActive,
            handleStatePanelClose,
            widgetStates,
            switchState,
            handleAddState,
            handleWidgetDragStart,
            handleWidgetDragEnd,
            handleWidgetDragMove,
            activeStateId
        } = store.widgets;
        const {showToolbar} = store.toolbar;
        const topHeight = showToolbar ? 90 : 72;
        const dragTop = showToolbar ? 60 : 42;
        const {isApp} = store.config;

        return (
            <>
                <PopupPanel
                    title={"组件"}
                    visible={slideActiveType === "widget"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                >
                    <WidgetPanel
                        isApp={isApp}
                        onDragStart={handleWidgetDragStart}
                        onDragMove={handleWidgetDragMove}
                        onDragEnd={handleWidgetDragEnd}
                    />
                </PopupPanel>
                <PopupPanel
                    title={"我的组件"}
                    visible={slideActiveType === "my_widget"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                />
                <PopupPanel
                    title={"图标"}
                    visible={slideActiveType === "icons"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                />
                <PopupPanel
                    title={"母版"}
                    visible={slideActiveType === "master"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                />
                <PopupPanel
                    top={topHeight}
                    visible={stateSlideActive}
                    title={"状态"}
                    drag={true}
                    className={"dznoaS"}
                    dragTop={dragTop}
                    onClose={handleStatePanelClose}
                >
                    <StatesListView
                        data={widgetStates}
                        onChange={switchState}
                        activeId={activeStateId}
                        onAdd={handleAddState}
                    />
                </PopupPanel>
            </>
        );
    }

    _render() {
        let store = this.store;
        const { color, targetRect, onChange: colorChange } = store.colorPickProps;
        return (
            <div id={"design"}>
                <div className={`ds-design ${store.footer.preferenceConfig.theme}`}>
                    <Toolbar store={store.toolbar} />
                    {this.renderContext()}
                    <div className={"fixed_area"}>
                        {this.renderSlidePanel()}
                        <ColorPicker color={color} onChange={colorChange} targetRect={targetRect}/>
                        <Dialog/>
                        <div className={'group-list drag-new-widget'} ref={store.widgets.newWidgetRef}/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
