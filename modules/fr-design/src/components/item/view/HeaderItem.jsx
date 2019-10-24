/**
 *
 * @author tangzehua
 * @sine 2019-10-16 15:04
 */

// @flow
import React from 'react';

type Props = {
    fold?: boolean
};
type State = {

};

export class HeaderItem extends React.Component<Props, State> {

    static defaultProps = {
        fold: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            fold: props.fold,
        }
    }

    handleFold = () => {
        this.setState({fold: !this.state.fold});
    };

    render() {
        let that = this;
        const {children, item} = that.props;
        const {fold} = that.state;
        const style = {overflow: 'hidden', transition: "height 200ms ease-in-out 0s"};
        if (fold) {
            style.height = 0;
        }
        return (
            <div className={'item-layout'}>
                <header onClick={that.handleFold}>
                    <p className={"title"}>{item.title}</p>
                </header>
                <div style={style}>
                    <section>
                        <div className={"bg-content"}>
                            {children}
                        </div>
                    </section>
                </div>
            </div>
        );
    };
}
