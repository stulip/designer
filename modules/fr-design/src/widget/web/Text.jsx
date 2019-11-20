/**
 *
 * @author tangzehua
 * @sine 2019-10-11 16:12
 */

// @flow
import React from 'react';
import type {BaseTextProps} from "../base";
import {BaseText} from "../base";
import {WidgetConst} from "../config";

type Props = {
    ...BaseTextProps
};

type State = {};

export class Text extends BaseText<Props, State> {
    static displayName = WidgetConst.Web.Text
}
