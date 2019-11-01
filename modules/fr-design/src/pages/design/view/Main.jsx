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
import {ColorPicker, Modal, PopupPanel} from "fr-ui";
import {StatesListView} from "../../../components";

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
            activeStateId
        } = store.widgets;
        const {showToolbar} = store.toolbar;
        const topHeight = showToolbar ? 112 : 96;
        const dragTop = showToolbar ? 60 : 42;

        return (
            <>
                <PopupPanel
                    title={"组件"}
                    visible={slideActiveType === "widget"}
                    className={"dznoaI"}
                    top={topHeight}
                    onClose={handleSlidePanelClose}
                />
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
                    top={dragTop + 8}
                    visible={stateSlideActive}
                    title={"状态"}
                    drag={true}
                    className={"dznoaS"}
                    dragTop={dragTop}
                    onClose={handleStatePanelClose}
                >
                    <StatesListView data={widgetStates} onChange={switchState} activeId={activeStateId}
                                    onAdd={handleAddState}/>
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
                        <Modal/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
