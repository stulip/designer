/**
 *
 * @author tangzehua
 * @sine 2019-08-23 11:15
 */

import React from 'react';
import './assets/index.css';
import {register} from './router';
import 'react-hot-loader';

register();
const version = process.env.MODULE_VERSION;
export {
    version
}
