/**
 *
 * @author tangzehua
 * @sine 2019-10-17 15:20
 */

// @flow
import React from 'react';
import {IBotIcon} from 'fr-web'
import {Form} from "fr-ui";

type Props = {

};
type State = {

};

export class LockButtonItem extends Form.BaseItem<Props, State> {

    handleClick = ()=> {
        this.onChange(!this.state.value);
    };

    render() {
        const {value} = this.state;
        const name = !value ? "unlock": "lock";
        const {style} = this.props.item;
        return (
            <div style={{textAlign: 'center', ...style}}>
                <a onClick={this.handleClick}>
                    <IBotIcon name={name} type={'dora'}/>
                </a>
            </div>
        );
    };
}
