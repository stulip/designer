/**
 *
 * @author tangzehua
 * @sine 2019-09-29 14:26
 */

// @flow
import React from 'react';

export const LineItem = ({item}) => <div className={'line-item'} style={{marginTop: item.top, marginBottom: item.bottom}}/>;
export const GapItem = ({item}) => <div className={'gap-item'} style={{height: item.height}}/>;
