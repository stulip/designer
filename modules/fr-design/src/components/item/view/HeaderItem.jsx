/**
 *
 * @author tangzehua
 * @sine 2019-10-16 15:04
 */

// @flow
import React from 'react';

type Props = {

};
type State = {

};

export class HeaderItem extends React.Component<Props, State> {
    render() {
        const {children, item} = this.props;
        return (
            <div className={'item-layout'}>
                <header>
                    <p className={"title"}>{item.title}</p>
                </header>
                <section>
                    <div className={"bg-content"}>
                        {children}
                    </div>
                </section>
            </div>
        );
    };
}
