/**
 * 布局Layout属性
 * @author tangzehua
 * @sine 2019-10-15 15:05
 */

// @flow
import React from 'react';
import {Form} from "fr-ui";
import {IBotForm} from 'fr-web';
import '../assets/layout.pcss';

type Props = {

};
type State = {

};

export class LayoutItem extends Form.BaseItem<Props, State> {

    render() {
        let that = this;
        let { item } = that.props;
        const { value = {} } = that.state;

        return (
            <div className={"item-layout"}>
                <header>
                    <p className={"title"}>{item.title}</p>
                </header>
                <section>
                    <div className={"bg-content"}>
                        <div className={'form-item'}>
                            <span className={'left-label'}>方向</span>
                            <div className={'right-content'}>
                                <IBotForm.PanelSelect />
                            </div>
                        </div>
                       <div className={'item-group'}>
                           <div className={'form-item column'}>
                               <div className={'right-content'}>
                                   <IBotForm.PanelSelect />
                               </div>
                               <span>次轴</span>
                           </div>
                           <div className={'form-item column'}>
                               <div className={'right-content'}>
                                   <IBotForm.PanelSelect />
                               </div>
                               <span>主轴</span>
                           </div>
                       </div>
                    </div>
                </section>
            </div>
        );
    };
}

