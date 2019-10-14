/**
 *
 * @author tangzehua
 * @sine 2019-10-10 09:45
 */

// @flow
import React from "react";
import { StatusBar, Header, IPhoneXOperateBar, Text, Panel } from "../../../widget/mobile";
import { observer } from "mobx-react";
import {classNames, DesignEvent} from "fr-web";
import "../../../widget/assets";
import { ViewGroupStore } from "../store/ViewGroupStore";
import {EventConst} from "../../../config/Attribute";

type Props = {
    store: ViewGroupStore
};
type State = {};

@observer
export class ViewGroup extends React.Component<Props, State> {

    componentDidMount() {
        const store = this.props.store;
        store.mount();
    }

    componentWillUnmount() {
        const store = this.props.store;
        store.unmount();
    }

    _render() {
        const { store } = this.props;
        const { main } = store;
        const { canvasRect, canvasScale } = main.section;
        const { designRect } = main.config;

        return (
            <div className={classNames("group-list", designRect.type)} ref={store.groupRef}>
                <StatusBar
                    width={canvasRect.width}
                    height={designRect.top}
                />
                <Header
                    width={canvasRect.width}
                    height={designRect.nav_height}
                />
                <IPhoneXOperateBar
                    width={canvasRect.width}
                    height={designRect.bottom}
                    designHeight={canvasRect.height}
                />
                <Panel>
                    <Text>
                        刘亦菲
                    </Text>
                    <Text>
                        李小璐不雅视频
                    </Text>
                </Panel>
                <Text>
                    杨幂
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
                <Text>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </Text>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
