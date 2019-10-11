/**
 *
 * @author tangzehua
 * @sine 2019-09-29 14:17
 */

// @flow
import React from "react";
import "../assets/background.pcss";
import { Form, Slider } from "fr-ui";
import { IBotForm, ColorPicker } from "fr-web";
import {Color, Tools} from "@xt-web/core";

type Props = {
    item: {
        handlePicker: () => void
    }
};
type State = {};

export class BackgroundItem extends Form.BaseItem {

    getValue(value): * {
        const color = ColorPicker.parseColor(value);
        return {rgba: value, hex: color.hex, alpha: parseInt(color.alpha * 100)};
    }

    handleAlpha = (value: string) => {
        const color = Color.hex2rgb(this.state.value.hex);
        color.a = Tools.toDecimal(value / 100);
        this.onChange(Color.rgb2rgbaStr(color));
    };

    render() {
        let that = this;
        let { item } = that.props;
        const { value = "" } = that.state;
        return (
            <div className={"item-background"}>
                <header>
                    <p className={"title"}>{item.title}</p>
                </header>
                <section>
                    <div className={"bg-content"}>
                        <div className="hwJxmv" onClick={item.handlePicker}>
                            <div className="thumbnail-wrapper">
                                <div className="thumbnail" style={{ backgroundColor: value.rgba }} />
                            </div>
                        </div>
                        <Slider value={value.alpha} onChange={that.handleAlpha}/>
                        <IBotForm.PanelInputNumber
                            min={0}
                            max={100}
                            value={value.alpha}
                            onConfirm={that.handleAlpha}
                            className={"input-number"}
                        />
                    </div>
                </section>
            </div>
        );
    }
}
