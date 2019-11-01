/**
 * modal 弹框
 * @author tangzehua
 * @sine 2019-10-31 16:40
 */

// @flow
import React from 'react';
import {IBotForm, IBotModal} from "fr-web";

type Props = {};
type State = {};

let instance;
const ModalType = {
    Toast: "0",
    Alert: '1',
    Prompt: "2",
    Confirm: "3",
};

export class Modal extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        const that = this;
        that.state = {type: null, options: {}};
        instance = this;
    }

    static prompt(options = {}) {
        instance && instance.setState({type: ModalType.Prompt, options: options});
    }

    static confirm(options = {}) {
        instance && instance.setState({type: ModalType.Prompt, options: options});
    }

    static toast(options = {}) {
        instance && instance.setState({type: ModalType.Prompt, options: options});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.type !== this.state.type;
    }

    renderToast() {
        const {options} = this.state;
        return null;
    }

    renderPrompt() {
        const {options} = this.state;

        return (
            <IBotModal isOpen={true} openerType={'custom'}>
                <IBotForm.Input/>
            </IBotModal>
        )
    }

    render() {
        const that = this;
        const {type} = that.state;
        switch (type) {
            case ModalType.Prompt:
                return that.renderPrompt();
            case ModalType.Toast:
                return that.renderToast();
            case ModalType.Alert:
            case ModalType.Confirm:
            default:
                return null;
        }
    };
}
