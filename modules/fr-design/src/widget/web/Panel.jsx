/**
 * Mobile Panel
 * @author tangzehua
 * @sine 2019-10-12 10:20
 */

// @flow
import React from 'react';
import type {BasePanelProps} from "../base";
import {BasePanel} from "../base";
import {WidgetConst} from "../config";

type Props = {
    ...BasePanelProps
};
type State = {};

export class Panel extends BasePanel<Props, State> {
    static displayName = WidgetConst.Web.Panel

}
