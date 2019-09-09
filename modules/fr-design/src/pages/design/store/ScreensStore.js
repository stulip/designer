/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-05 10:44
 */
import {observable, action, computed} from 'mobx';
import type {MainStore} from "./MainStore.flow";
import React from "react";

export class ScreensStore {

    canvasRef:{current: Element} = React.createRef();

    main: MainStore;
    constructor (main: MainStore){
        this.main = main;
    }
}
