//@flow
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-hot-loader';
import App from './container/App'

import './assets'

window.onload = ()=> ReactDOM.render(<App/>, document.getElementById("root"));

export const version = process.env.MODULE_VERSION;
