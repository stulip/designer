/**
 *
 * @flow
 * @author tangzehua
 * @sine 2019-09-02 16:28
 */

import React from "react";
import {WidgetsStore} from "../store/WidgetsStore";
import {Exterior} from "./Exterior";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import {Events} from "./Events";

type Props = {
    store: WidgetsStore
};
type State = {};

export class RightPanel extends React.PureComponent<Props, State> {

    render() {
        let that = this;
        let store = this.props.store;
        return (
            <div className={"panel-right"}>
                <Tabs forceRenderTabPanel>
                    <TabList>
                        <Tab>属性</Tab>
                        <Tab>事件</Tab>
                    </TabList>
                    <TabPanel>
                        <Exterior store={store.main.attribute}/>
                    </TabPanel>
                    <TabPanel>
                        <Events store={store.main.events}/>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}
