/**
 * 颜色选择
 * @author tangzehua
 * @sine 2019-10-18 17:36
 */

// @flow
import React from "react";
import "../assets/color.pcss";
import {Form} from "fr-ui";
import {ColorPicker, DesignEvent} from "fr-web";
import {Types} from "@xt-web/core";

type Props = {
    item: {
        handlePicker: string | (() => void)
    }
};
type State = {
    value: {
        rgba: string,
        hex: string,
        alpha: number,
    }
};
export class ColorItem extends Form.BaseItem<Props, State> {
    getValue(value): * {
        const color = ColorPicker.parseColor(value || "#fff");
        return { rgba: value, hex: color.hex, alpha: parseInt(color.alpha * 100) };
    }

    handlePicker = (event: MouseEvent) => {
        let that = this;
        const { item } = that.props;
        const { value } = that.state;
        if (Types.isFunction(item.handlePicker)) {
            item.handlePicker(event, value.hex, that.onChange);
        } else {
            DesignEvent.emit(item.handlePicker, event, value.hex, that.onChange);
        }
    };


    renderItem() {
        let that = this;
        let { item } = that.props;
        const { value = {} } = that.state;
        return (
            <div className={"item-color"}>
                <div className="hwJxmv" onClick={that.handlePicker}>
                    <div className="thumbnail-wrapper">
                        <div className="thumbnail" style={{ backgroundColor: value.rgba }} />
                    </div>
                </div>
            </div>
        );
    }
}
