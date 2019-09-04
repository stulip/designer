/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:30
 */
import * as React from 'react';
import {IBotIcon} from "fr-web";
import {Rules} from "./Rules";
import {ScrollBar} from "./ScrollBar";

type Props = {

};
type State = {

};

export class SectionView extends React.Component<Props, State> {

    render() {
        return (
            <section className={'art-board'}>
                <div className={'prev-page float-btn dark'}>
                    <IBotIcon type={'dora'} name={'arrow_up'}/>
                    <span>返回工作区</span>
                </div>
                <div className={'prev-page float-btn'}>
                    <span className={'dot'}/>
                    <span>链接上一页</span>
                </div>
                <Rules />
                <ScrollBar x={0.5}/>
            </section>
        );
    };
};
