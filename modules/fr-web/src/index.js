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
import ColorPicker, {parseColor} from "mb-react-color-picker";
import IBotIcon from "@ibot/ibot/lib/icon";
import IBotSVG from "@ibot/ibot/lib/svg";
import IBotModal from "@ibot/ibot/lib/core-modal";
import * as IBotForm from "@ibot/ibot/lib/form";
import {Tooltip as IBotTooltip} from "@ibot/ibot/lib/text";
// mobx
import {configure} from "mobx";
// EventEmitter
import {EventEmitter} from "eventemitter3";
//class names
import classNames from "classnames";
// xt
import {Storage} from '@xt-web/core'

ColorPicker.parseColor = parseColor;

configure({enforceActions: "observed"});

const DesignEvent = new EventEmitter();

// end
Storage.local = new Storage(localStorage);
Storage.session = new Storage(sessionStorage);
//

window.onload = () => ReactDOM.render(<App/>, document.getElementById("root"));
export const version = process.env.MODULE_VERSION;
export {
    Ruler,
    ResizableRect,
    ColorPicker,
    IBotIcon,
    IBotSVG,
    IBotModal,
    IBotTooltip,
    EventEmitter,
    DesignEvent,
    classNames,
    IBotForm
};
