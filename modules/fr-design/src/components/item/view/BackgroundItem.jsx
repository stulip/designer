/**
 *
 * @author tangzehua
 * @sine 2019-09-29 14:17
 */

// @flow
import React from "react";
import "../assets/background.pcss";
import {Form, Slider} from "fr-ui";
import {ColorPicker, IBotConfirmInputNumber} from "fr-web";
import {DesignEvent} from 'fr-design';
import {Color, Tools, Types} from "@xt-web/core";

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

export class BackgroundItem extends Form.BaseItem<Props, State> {
    getValue(value): * {
        const color = ColorPicker.parseColor(value || "#fff");
        console.log(color, value);
        return { rgba: value, hex: color.hex, alpha: parseInt(color.alpha * 100) };
    }

    handleAlpha = (value: string) => {
        const color = Color.hex2rgb(this.state.value.hex);
        color.a = Tools.toDecimal(value / 100);
        this.onChange(Color.rgb2rgbaStr(color));
    };

    handlePicker = (event: MouseEvent) => {
        let that = this;
        const { item } = that.props;
        const { value } = that.state;
        if (Types.isFunction(item.handlePicker)) {
            item.handlePicker(event, value.rgba, that.onChange);
        } else {
            DesignEvent.emit(item.handlePicker, event, value.rgba, that.onChange);
        }
    };

    render() {
        let that = this;
        let { item } = that.props;
        const { value = {} } = that.state;
        return (
            <div className={"item-background"}>
                <header>
                    <p className={"title"}>{item.title}</p>
                </header>
                <section>
                    <div className={"bg-content"}>
                        <div className="hwJxmv" onClick={that.handlePicker}>
                            <div className="thumbnail-wrapper">
                                <div className="thumbnail" style={{ backgroundColor: value.rgba }} />
                            </div>
                        </div>
                        <Slider value={value.alpha} onChange={that.handleAlpha}/>
                        <IBotConfirmInputNumber
                            min={0}
                            max={100}
                            value={value.alpha}
                            onConfirm={that.handleAlpha}
                            size={"small"}
                            className={"PanelInputNumber input-number"}
                        />
                    </div>
                </section>
            </div>
        );
    }
}
