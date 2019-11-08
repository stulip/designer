/**
 *
 * @author tangzehua
 * @sine 2019-09-29 17:39
 */

// @flow
import React from 'react';
import {Form} from "fr-ui";
import {IBotCheck, IBotConfirmInputNumber, IBotSVG} from 'fr-web';
import '../assets/grid-setting.pcss'

type Props = {

};
type State = {

};

export class GridSettingItem extends Form.BaseItem<Props, State> {

    handleCheck = (value)=> {
        const {size, visible} = this.state.value;
        this.onChange({size, visible: !visible});
    };

    handleSize = (value: string)=> {
        this.onChange({visible: this.state.value.visible, size: value});
    };

    render() {
        let that = this;
        const {item} = that.props;
        const { value = {}} = that.state;
        const grid = item.grid || {};
        return (
            <div className={"item-grid-setting"}>
                <header>
                    <p className={"title"}>{item.title}</p>
                </header>
                <section>
                    <div className={"grid-content"}>
                        <IBotCheck isChecked={!!value.visible} onChange={that.handleCheck}/>
                        <div className="dir-icon">
                            <IBotSVG name={'design/grid'}/>
                        </div>
                        <IBotConfirmInputNumber
                            min={0}
                            max={grid.max}
                            value={value.size}
                            onConfirm={that.handleSize}
                            size={"small"}
                            className={"PanelInputNumber input-number"}
                        />
                    </div>
                </section>
            </div>
        );
    };
}
