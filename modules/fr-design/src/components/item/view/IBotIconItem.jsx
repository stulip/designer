/**
 *
 * @author tangzehua
 * @sine 2019-10-16 15:04
 */

// @flow
import React from 'react';
import {IBotSVG} from 'fr-web'

type Props = {};
type State = {};

export class IBotIconItem extends React.Component<Props, State> {

    render() {
        let that = this;
        const {item} = that.props;
        const {icon, className, name, onClick} = item.svg || {};
        return (
            <a onClick={onClick} className={'a-icon'}>
                <IBotSVG icon={icon} className={className} name={name}/>
            </a>
        );
    };
}
