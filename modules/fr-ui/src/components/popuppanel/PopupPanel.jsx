/**
 * 弹出层面板
 * @author tangzehua
 * @sine 2019-09-20 16:09
 */

// @flow
import * as React from 'react';
import {IBotSVG} from 'fr-web'
import './assets'

type Props = {
    title: string,
    visible: boolean,
    className : string,
    top: number,
    onClose: ()=> void,
};
type State = {
    visible: boolean,
};

export class PopupPanel extends React.PureComponent<Props, State> {

    state = {
        visible: false,
    };

    static defaultProps = {
        onClose: ()=>{},
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visible !== prevState.visible){
            return {visible: nextProps.visible}
        }
        return null;
    }

    handleClose = ()=> {
        this.props.onClose();
        this.setState({visible: false});
    };

    _render() {
        let that = this;
        const {title, className, children, top} =  that.props;
        return (
            <aside className={className} style={{top}}>
                <header>
                    <p className="title">{title}</p>
                    <div className="header-buttons">
                        <a className={'icon dora'} onClick={that.handleClose}>
                            <IBotSVG name={'times'}/>
                        </a>
                    </div>
                </header>
                <section className={'panel-body'}>
                    {children}
                </section>
            </aside>
        );
    };

    render(){
        const {visible} = this.state;
        if ( !visible ) return null;
        return this._render();
    }
}
