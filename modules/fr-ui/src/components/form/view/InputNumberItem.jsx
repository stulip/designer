/**
 *
 * @author tangzehua
 * @sine 2019-09-27 11:14
 */

// @flow
import * as React from 'react';
import {IBotForm} from 'fr-web';

type Props = {

};
type State = {

};

export class InputNumberItem extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <IBotForm.PanelInputNumber/>
            </div>
        );
    };
}
