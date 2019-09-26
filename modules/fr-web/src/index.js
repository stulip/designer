//@flow
import React from "react";
import ReactDOM from "react-dom";
import "react-hot-loader";
import App from "./container/App";
import "./assets";

// plugins
// mo dao
import Ruler from "mb-sketch-ruler";
import ResizableRect from "react-resizable-rotatable-draggable";
import ColorPicker, { parseColor } from "mb-react-color-picker";
ColorPicker.parseColor = parseColor;
import IBotIcon from "@ibot/ibot/lib/icon";
import IBotSVG from "@ibot/ibot/lib/svg";
import { Tooltip as IBotTooltip } from "@ibot/ibot/lib/text";

// mobx
import { configure } from "mobx";
configure({ enforceActions: "observed" });

// EventEmitter
import { EventEmitter } from "eventemitter3";
const DesignEvent = new EventEmitter();

//class names
import classNames from "classnames";
// end

window.onload = () => ReactDOM.render(<App />, document.getElementById("root"));
export const version = process.env.MODULE_VERSION;
export { Ruler, ResizableRect, ColorPicker, IBotIcon, IBotSVG, IBotTooltip, EventEmitter, DesignEvent, classNames };
