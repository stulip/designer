/**
 *
 * @flow
 * @author tangzehua
 * @sine 2018-12-27 11:29
 */
import React from "react";
import {BaseSelectItem} from "../base/BaseSelectItem";
import {Types} from "@xt-web/core";
import {IBotSelect} from "fr-web";

class Select extends IBotSelect {

    constructor(props) {
        super(props);
        this.toggle = ::this._toggle;
    }

    _toggle() {
        const that = this;
        const {isOpen} = that.state;
        const {onOpen} = that.props;
        !isOpen && onOpen && onOpen();
        that.setState({isOpen: !isOpen});
    }
}

class IBotSelectItem extends BaseSelectItem {
    static defaultProps = {
        single: true
    };

    constructor(props) {
        super(props);
        this.onOpen = ::this.onOpen;
    }

    fetchData = () => {
        const that = this;
        if (!that.state.visible) return;
        const {formData} = that.props;
        const {select: {getData} = {}} = that.props.item;
        if (Types.isFunction(getData)) {
            setTimeout(() => {
                that.selectData = getData(formData);
            }, 0);
        }
    };

    componentDidMount() {
        const {select: {initRequest = false} = {}} = this.props;
        initRequest && this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        const {select: {initRequest = false} = {}} = this.props;
        if (initRequest && !prevState.visible && this.state.visible) {
            this.fetchData();
        }
    }

    onChange(data) {
        const {single} = this.props;
        super.onChange(!single && !Array.isArray(data) && !Types.isEmpty(data) ? [data] : data);
    }

    setValue(data) {
        const {single} = this.props;
        super.setValue(!single && !Array.isArray(data) && !Types.isEmpty(data) ? [data] : data);
    }

    onOpen() {
        const {select: {onOpen} = {}} = this.props.item;
        onOpen && onOpen();
        this.fetchData();
    }

    renderItem() {
        let that = this;
        const {title, select = {}, titleDirection} = that.props.item;
        let {error, required, disabled, value} = that.state;

        return (
            <Select
                size={"small"}
                placeholder={""}
                emptyMsg={''}
                {...select}
                onOpen={that.onOpen}
                optionList={that.selectData}
                value={value}
                disabled={disabled}
                onChange={that.onChange}
            />
        );
    }
}

export { IBotSelectItem };
