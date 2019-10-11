/**
 *
 * @author tangzehua
 * @sine 2019-10-10 09:45
 */

// @flow
import React from "react";
import { StatusBar, Header, IPhoneXOperateBar, Text } from "../../../widget/mobile";
import { observer } from "mobx-react";
import { classNames } from "fr-web";
import "../../../components/assets";
import { ViewGroupStore } from "../store/ViewGroupStore";

type Props = {
    store: ViewGroupStore
};
type State = {};

@observer
export class ViewGroup extends React.Component<Props, State> {
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
                    onMouseExit={store.handleWidgetMouseExit}
                    onMouseEnter={store.handleWidgetMouseEnter}
                />
                <Header
                    width={canvasRect.width}
                    height={designRect.nav_height}
                    onMouseExit={store.handleWidgetMouseExit}
                    onMouseEnter={store.handleWidgetMouseEnter}
                />
                <IPhoneXOperateBar
                    width={canvasRect.width}
                    height={designRect.bottom}
                    designHeight={canvasRect.height}
                />
                <Text onMouseExit={store.handleWidgetMouseExit}
                      onMouseEnter={store.handleWidgetMouseEnter}>
                    测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                </Text>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
                    <span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </span>
                </div>
                <div>
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
                </div>
            </div>
        );
    }

    render() {
        return this._render();
    }
}
