/**
 *
 * @author tangzehua
 * @sine 2019-08-23 11:15
 */

import React from 'react';
import './assets/index.css';
import 'react-hot-loader';
import {register} from './router';

register();
const version = process.env.MODULE_VERSION;
export {
    version
}
