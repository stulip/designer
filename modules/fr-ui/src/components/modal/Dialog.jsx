/**
 * modal 弹框
 * @author tangzehua
 * @sine 2019-10-31 16:40
 */

// @flow
import React from "react";
import {IBotInput, IBotModal} from "fr-web";
import "./assets";

type Props = {};
type State = {};

let instance;
const ModalType = {
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
                <IBotInput className={"prompt-input"} value={value} onChange={that.handleValue}/>
            </IBotModal>
        );
    }

    renderConfirm() {
        let that = this;
        const {
            options: {modal = {}},
            title,
        } = that.state;
        return (
            <IBotModal
                {...modal}
                isOpen={true}
                title={"提示"}
                type={"display"}
                cancelText={"取消"}
                confirmText={"确定"}
                canClose={false}
                onConfirm={that.handleConfirm}
                onClose={that.handleClose}
                onCancel={that.handleCancel}
            >
                <span>{title}</span>
            </IBotModal>
        );
    }

    render() {
        const that = this;
        const {type} = that.state;
        switch (type) {
            case ModalType.Prompt:
                return that.renderPrompt();
            case ModalType.Confirm:
                return that.renderConfirm();
            case ModalType.Alert:
            default:
                return null;
        }
    }
}
