/**
 * modal 弹框
 * @author tangzehua
 * @sine 2019-10-31 16:40
 */

// @flow
import React from "react";
import {IBotForm, IBotModal} from "fr-web";
import "./assets";

type Props = {};
type State = {};

let instance;
const ModalType = {
    Toast: "0",
    Alert: "1",
    Prompt: "2",
    Confirm: "3"
};

export class Dialog extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        const that = this;
        that.state = {type: null, title: null, options: {}, value: ""};
        instance = this;
    }

    /**
     * 弹出输入框
     * @param {string} title
     * @param {Object} [options]
     */
    static prompt(title, options = {}) {
        instance && instance.setState({type: ModalType.Prompt, title, options, value: options.value});
    }

    static confirm(title, options = {}) {
        instance && instance.setState({type: ModalType.Confirm, title, options});
    }

    static toast(title, options = {}) {
        instance && instance.setState({type: ModalType.Prompt, title, options: options});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.type !== this.state.type || nextState.value !== this.state.value;
    }

    handleCancel = () => {
        const {
            options: {cancel, done},
            value
        } = this.state;
        cancel && cancel(value);
    };

    handleConfirm = () => {
        const {
            options: {cancel, done},
            value
        } = this.state;
        done && done(value);
    };

    handleClose = () => {
        const {type} = this.state;
        if (type) {
            this.setState({type: null, title: "", options: {}, value: ""});
        }
    };

    handleValue = value => {
        this.setState({value});
    };

    renderToast() {
        const {options} = this.state;
        return null;
    }

    renderPrompt() {
        let that = this;
        const {
            options: {modal = {}},
            title,
            value
        } = that.state;
        return (
            <IBotModal
                {...modal}
                isOpen={true}
                title={title}
                type={"display"}
                cancelText={"取消"}
                confirmText={"确定"}
                canClose={false}
                onConfirm={that.handleConfirm}
                onClose={that.handleClose}
                onCancel={that.handleCancel}
            >
                <IBotForm.Input className={"prompt-input"} value={value} onChange={that.handleValue}/>
            </IBotModal>
        );
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
    }
}
