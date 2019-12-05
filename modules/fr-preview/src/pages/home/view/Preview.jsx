/**
 *
 * @author tangzehua
 * @sine 2019-12-05 13:58
 */

// @flow
import React from 'react';
import {classNames} from 'fr-web'
import {RootWidget} from 'fr-design'
import {PreviewStore} from "../store/PreviewStore";
import {observer} from "mobx-react";
import '../assets/preview.pcss'

type Props = {};
type State = {};

@observer
export class Preview extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.store = new PreviewStore(props);
    }

    render() {
        const {pageId, widgetMap, rootConfig = {}, widgetModule, config} = this.store;
        const {props: {default: rootProps = {}} = {}} = rootConfig;

        const {designRect, isApp} = config;
        const style = {
            width: isApp ? designRect.width : '100vw',
            height: isApp ? designRect.height : '100vh'
        };

        const min = {
            minWidth: designRect.width + 20 * 2,
            minHeight: designRect.height + 20 * 2,
        };

        return (
            <div className={'ds-preview screens grid-background'}>
                <div className={'center'} style={min}>
                    <div style={style} className={classNames("canvas", designRect.type)}>
                        <RootWidget
                            cid={pageId}
                            {...rootConfig}
                            canvasRect={designRect}
                            designRect={designRect}
                            widgetMap={widgetMap}
                            module={widgetModule}
                            isPreview
                        />
                    </div>
                </div>
            </div>
        );
    };
}
