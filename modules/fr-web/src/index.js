//@flow
import React from "react";
import ReactDOM from "react-dom";
import "react-hot-loader";
import App from "./container/App";
import "./assets";
// plugins
// mo dao
import Ruler from "mb-sketch-ruler";
// import ResizableRect from "react-resizable-rotatable-draggable";
import ColorPicker, {parseColor} from "mb-react-color-picker";
import IBotIcon from "@ibot/ibot/lib/icon";
import IBotSVG from "@ibot/ibot/lib/svg";
import IBotModal from "@ibot/ibot/lib/core-modal";
import IBotTooltip from '@ibot/ibot/lib/tooltip';
import IBotInputNumber from '@ibot/ibot/lib/numberInput';
import IBotConfirmInputNumber from '@ibot/ibot/lib/confirmInputNumber';
import IBotCheck, {CheckGroup as IBotCheckGroup} from '@ibot/ibot/lib/check';
import IBotSelect, {SelectMenu as IBotSelectMenu} from '@ibot/ibot/lib/select';
import IBotInput, {Textarea as IBotTextArea} from '@ibot/ibot/lib/input';
// mobx end
import Tree from 'rc-tree'
//
import Toast from 'cogo-toast';
import {configure} from "mobx";
//class names
import classNames from "classnames";
// xt
import {Storage} from '@xt-web/core'

ColorPicker.parseColor = parseColor;

configure({enforceActions: "observed"});

// end
Storage.local = new Storage(localStorage);
Storage.session = new Storage(sessionStorage);
//

window.onload = () => ReactDOM.render(<App/>, document.getElementById("root"));
export const version = process.env.MODULE_VERSION;
export {
    Toast,
    Ruler,
    ColorPicker,
    IBotIcon,
    IBotSVG,
    IBotModal,
    IBotTooltip,
    IBotCheck,
    IBotCheckGroup,
    IBotSelect,
    IBotSelectMenu,
    IBotInput,
    IBotTextArea,
    IBotInputNumber,
    IBotConfirmInputNumber,
    classNames,
    Tree
};
