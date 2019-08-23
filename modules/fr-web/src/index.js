//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-hot-loader';
import App from './container/App'
import './assets'

// plugins
import Ruler from 'mb-sketch-ruler';
import ResizableRect from 'react-resizable-rotatable-draggable'
import ColorPicker, {parseColor} from 'mb-react-color-picker';
ColorPicker.parseColor = parseColor;
import * as ibot from '@ibot/ibot';

// end

window.onload = ()=> ReactDOM.render(<App/>, document.getElementById("root"));

const version = process.env.MODULE_VERSION;
export {
    version,
    Ruler,
    ResizableRect,
    ColorPicker,
    ibot
}
