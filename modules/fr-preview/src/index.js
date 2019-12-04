/**
 * 预览模块
 * @author tangzehua
 * @sine 2019-12-04 16:12
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
