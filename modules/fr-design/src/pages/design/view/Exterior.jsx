/**
 * 外观属性
 * @author tangzehua
 * @sine 2019-09-26 17:18
 */

// @flow
import * as React from 'react';
import '../assets/exterior.pcss'
import {Form} from 'fr-ui'

type Props = {

};
type State = {

};

const BasisConfig = [
    {
        title: '高度',
        form: 'width',
        type: 'text',
        value: '测试测试,,,,,测试'
    },
    {
        title: '宽度',
        form: 'height',
        type: 'text',
        value: '测试测试,,,,,测试'
    }
];

export class Exterior extends React.Component<Props, State> {
    _render() {
        return (
            <div>
                <Form.View config={BasisConfig}/>
            </div>
        );
    };

    render(){
        return this._render();
    }
}
