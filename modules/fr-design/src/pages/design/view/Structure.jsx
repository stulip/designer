/**
 * 页面目录和结构目录
 * @author tangzehua
 * @sine 2019-12-12 16:05
 */

// @flow
import React from "react";
import {classNames, IBotIcon, IBotSVG, Tree} from 'fr-web';
import {observer} from "mobx-react";
import {SVG} from "fr-ui";

type Props = {};
type State = {};

@observer
export class Structure extends React.Component<Props, State> {

    componentDidMount() {
        this.props.store.mount();
    }

    componentWillUnmount() {
        this.props.store.unmount();
    }

    switcherIcon = (props) => {
        const {expanded, children} = props;
        if (children.length) {
            return (
                <a className={"expander"}>
                    <IBotSVG icon={SVG.arrow_right2} className={classNames({expanded})}/>
                </a>
            )
        }
        return null;
    };

    renderStructure() {
        const that = this;
        const {
            main: {
                config: {isApp},
            },
            structureData,
            onStructureExpand,
            onStructureSelect,
            onStructureMouseEnter,
            onStructureMouseLeave,
            structureExpendKeys,
            structureSelectedKeys,
            structureRef,
        } = this.props.store;
        return (
            <div className={"widget-panel"}>
                <div className={"layout-panel"}>
                    <header>
                        <div className={"header-left"}>
                            <p>元素</p>
                        </div>
                        <div className={"header-right"}/>
                    </header>
                    <div className={'structure-list'}>
                        <Tree
                            showLine={false}
                            ref={structureRef}
                            selectedKeys={structureSelectedKeys}
                            onMouseEnter={onStructureMouseEnter}
                            onMouseLeave={onStructureMouseLeave}
                            onSelect={onStructureSelect}
                            expandedKeys={structureExpendKeys}
                            onExpand={onStructureExpand}
                            switcherIcon={that.switcherIcon}
                            icon={<IBotSVG icon={SVG.file}/>}
                            defaultExpandParent={true}
                            treeData={structureData}
                        />
                    </div>
                </div>
            </div>
        )
    }

    renderProject() {
        const that = this;
        const {
            main: {
                config: {isApp},
                switchPage
            },
        } = this.props.store;
        const pages = isApp
            ? [
                {name: "客户关注产品", id: "007"},
                {name: "商品", id: "008"},
                {name: "信息收集", id: "009"}
            ]
            : [
                {name: "客户", id: "107"},
                {name: "产品", id: "108"},
                {name: "供应商", id: "109"}
            ];
        return (
            <div className={"screen-panel"}>
                <header>
                    <div className={'left'}>
                        <IBotIcon name={"plus_cb"} type={'dora'}/>
                        <p>新建页面</p>
                    </div>
                    <div className={'right'}/>
                </header>
                <div className={'screen-list'}>
                    {pages.map(pg => (
                        <a key={pg.id} onClick={() => switchPage(pg.id)}>
                            {pg.name}
                        </a>
                    ))}
                </div>
            </div>
        )
    }

    _render() {
        const that = this;
        return (
            <div className={"structure"}>
                {that.renderProject()}
                {that.renderStructure()}
            </div>
        );
    }

    render() {
        return this._render();
    }
}
