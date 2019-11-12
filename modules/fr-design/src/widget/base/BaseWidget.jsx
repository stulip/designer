/**
 *
 * @author tangzehua
 * @sine 2019-10-11 11:02
 */

// @flow
import React from "react";
import {classNames, DesignEvent} from "fr-web";
import {PropsConst, StatesConst} from "../../config/Attribute";
import {Form} from "fr-ui";
import type {DesignType, Rect, WidgetConfigDefined, WidgetProps, WidgetState} from "../../flow/Main.flow";
import {WidgetConfig} from "./base.widget.config";

export type BaseWidgetProps = {
    canvasRect: Rect,
    designRect: DesignType,
    module: Object, // 所有可用属性控件
    parent?: { current: any },
    isHasBox: boolean, // 是否有box选框
    isDrag: boolean, // 是否被拖动
    ...WidgetConfigDefined
};
type State = {
    widget: Object,
    children: string[] | string
};

export class BaseWidget extends React.Component<BaseWidgetProps, State> {
    widgetRef = React.createRef();

    // 状态标识
    _stateId: string;

    // 状态数据
    stateData = {
        default: {
            data: {},
            props: {}
        }
    };
    states: [WidgetState] = [];

    get widget() {
        return this.widgetRef.current;
    }

    // 父节点
    get parentWidget(): BaseWidget | null {
        return this.props.parent;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.widget !== prevState.pWidget || nextProps.children !== prevState.pChildren) {
            const {widget, children} = nextProps;
            return {
                widget,
                pWidget: widget,
                children,
                pChildren: children
            };
        }
        return null;
    }

    constructor(props) {
        super(props);
        let that = this;
        that.state = {
            dragWidgetId: null,
            widget: props.widget,
            children: props.children,
        };
        that.states = props.states || [];
        // 所有子节点引用
        that.childrenRef = new Map();
        // 更新回调
        that.onUpdate = null;
        that._styles = null;
        // 初始化为默认状态属性
        that.initWidgetState();
    }

    initWidgetState() {
        const that = this;
        const {widgetProps = {}} = that.props;
        // 防止没有default属性
        if (!widgetProps.default) widgetProps.default = {};
        for (const [key, value] of Object.entries(widgetProps)) {
            const data = that.createWidgetProps(value);
            const props = that.widgetProps();
            that.stateData[key] = {data, props};
        }
    }

    /**
     * 返回原始状态
     * @returns {string}
     */
    getStateId() {
        return this._stateId;
    }

    /**
     * 处理后的状态
     * @returns {string}
     */
    get stateId() {
        const id = this._stateId;
        return !id || id === StatesConst.global.cid ? StatesConst.default.cid : id;
    }

    /**
     * 创建子widget
     * @param {Array<string>|string} widgetIds
     * @param {Map<string, WidgetConfigDefined>} [widgetMap]
     * @returns {*}
     */
    createWidget(widgetIds, widgetMap) {
        const that = this;
        const {canvasRect, designRect, module} = that.props;
        const {dragWidgetId} = that.state;
        widgetMap = widgetMap || that.props.widgetMap;
        const names = Array.isArray(widgetIds) ? widgetIds : [widgetIds];

        return names.map(cid => {
            const widget = widgetMap.get(cid);
            if (!widget) return null;
            const Comp = module[widget.component];
            return (
                Comp && (
                    <Comp
                        key={cid}
                        {...widget}
                        canvasRect={canvasRect}
                        designRect={designRect}
                        widgetMap={widgetMap}
                        module={module}
                        parent={that}
                        ref={ref => that.childrenRef.set(cid, ref)}
                        isDrag={dragWidgetId === cid}
                    />
                )
            );
        });
    }

    //子类实现
    getName() {
        return "widget";
    }

    componentDidMount() {
        const that = this;
        const {isHasBox = true, widgetMap} = that.props;
        widgetMap && isHasBox && that.addListener();
    }

    componentWillUnmount() {
        const that = this;
        const {isHasBox = true, widgetMap} = that.props;
        widgetMap && isHasBox && that.removeListener();
    }

    componentDidUpdate(prevProps, prevState) {
        let that = this;
        that.onUpdate && that.onUpdate();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.widget !== this.state.widget
            || nextState.children !== this.state.children;
    }

    // 子类实现, 默认值
    getDefaultConfig() {
        const that = this;
        const name = that.props.name;
        return {
            [PropsConst.widgetName]: name || that.getName(),
            [PropsConst.widgetInitialWidth]: false,
            [PropsConst.widgetInitialHeight]: false
        };
    }

    // 子类可继承
    createWidgetProps(config) {
        return Object.assign({}, this.getDefaultConfig(), config);
    }

    addListener() {
        let that = this;

        if (that.widget) {
            that.widget.addEventListener("mouseleave", that.handleMouseLeave, false);
            that.widget.addEventListener("mousedown", that.handleMouseDown, true);
            that.widget.addEventListener("mouseover", that.handleMouseEnter, false);
            that.widget.addEventListener("click", that.handleClick, false);
        }
    }

    removeListener() {
        let that = this;

        if (that.widget) {
            that.widget.removeEventListener("mouseleave", that.handleMouseLeave);
            that.widget.removeEventListener("mousedown", that.handleMouseDown);
            that.widget.removeEventListener("mouseover", that.handleMouseEnter);
            that.widget.removeEventListener("click", that.handleClick);
        }
    }

    handleMouseDown = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
    };

    /**
     * 获得鼠标焦点
     * @param event
     */
    handleMouseEnter = (event: MouseEvent): void => {
        DesignEvent.emit(PropsConst.widgetMouseEnter, event, this);
    };

    /**
     * 失去鼠标焦点
     * @param event
     */
    handleMouseLeave = (event: MouseEvent): void => {
        DesignEvent.emit(PropsConst.widgetMouseExit, event, this);
    };

    /**
     * 元素被点击
     * @param event
     */
    handleClick = (event: MouseEvent): void => {
        event.preventDefault();
        DesignEvent.emit(PropsConst.widgetMouseClick, event, this);
    };

    /**
     * 表单数据改变
     */
    handleChange() {
        this.refreshWidget();
    }

    refreshWidget() {
        this.forceUpdate();
    }

    /**
     * 是否禁用宽度改变
     * @returns {boolean}
     */
    getBasicConfig() {
        return {
            widgetX: {min: 0, disabled: true},
            widgetY: {min: 0, disabled: true},
            widgetWidth: {min: 0, disabled: true},
            widgetHeight: {min: 0, disabled: true}
        };
    }

    updateBasicData() {
        const that = this;
        const data = that.getFormData();
        data[PropsConst.widgetX] = that.widget.offsetLeft;
        data[PropsConst.widgetY] = that.widget.offsetTop;

        if (!data[PropsConst.widgetInitialWidth]) {
            data[PropsConst.widgetWidth] = that.widget.offsetWidth;
        }

        if (!data[PropsConst.widgetInitialHeight]) {
            data[PropsConst.widgetHeight] = that.widget.offsetHeight;
        }
    }

    /**
     * widget 属性, 子类实现
     * @param {Array<WidgetProps>} [child]
     * @returns Array<WidgetProps>
     */
    widgetProps(child: Array<WidgetProps> = []) {
        const basic = this.getBasicConfig();
        return WidgetConfig({basic});
    }

    /**
     * 获取widget属性
     * @returns {Array<WidgetProps>}
     */
    getWidgetProps(): [WidgetProps] {
        const that = this;
        this.updateBasicData();
        return that.stateData[that.stateId].props;
    }

    /**
     * 获取widget states
     * @returns {[WidgetState]}
     */
    getWidgetStates(): [WidgetState] {
        return this.states;
    }

    /**
     * 切换状态
     * @param stateId
     */
    switchStates(stateId: string) {
        let that = this;
        if (stateId in that.stateData || stateId === StatesConst.global.cid) {
            that._stateId = stateId;
            that.refreshWidget();
            // console.log('状态切换:', stateId);
        } else {
            console.error("状态属性未找到:", stateId);
        }
    }

    /**
     * 添加状态, 复制当前状态数据
     * @param {WidgetState} state
     */
    addState(state: WidgetState) {
        const that = this;
        const stateData = JSON.parse(JSON.stringify(that.stateData[that.stateId]));
        that.stateData[state.cid] = {data: stateData.data, props: stateData.props};
        that.states.push(state);
    }

    /**
     * 删除状态其属性
     * @param stateId
     */
    removeState(stateId) {
        delete this.stateData[stateId];
    }

    /**
     * 子类可重写, 默认Add widget 到children 里面
     * @param {string} widgetId
     * @returns {*|boolean}
     */
    addNewWidget(widgetId: string) {
        const that = this;
        const {children = []} = that.state;
        that.setState({children: [...children, widgetId], dragWidgetId: widgetId});
    }

    /**
     * 删除widget
     * @param widgetId
     */
    removeWidget(widgetId: string) {
        const that = this;
        const {children = []} = that.state;
        const wix = children.indexOf(widgetId);
        if (wix !== -1) {
            children.splice(wix, 1);
            that.setState({children: Array.from(children), dragWidgetId: null});
        }
    }

    /**
     * 原始表单数据
     * @returns {Object}
     */
    getFormData() {
        const that = this;
        return that.stateData[that.stateId].data;
    }

    // 获取style 对象
    get styles() {
        const that = this;
        if (!that._styles) {
            that._styles = Form.View.getFormatFormData(this.getFormData());
            setTimeout(function () {
                that._styles = null;
            }, 0);
        }
        return that._styles;
    }

    // 子类实现
    renderWidget(widgets) {
        const that = this;
        if (!Array.isArray(widgets) || !widgets) return widgets;
        return that.createWidget(widgets);
    }

    renderChild(options) {
        return this.renderWidget(this.state.children);
    }

    render() {
        let that = this;
        const {cid, isDrag} = that.props;
        return (
            <div className={classNames("group-flow", {"drag-widget": isDrag})} ref={that.widgetRef} data-cid={cid}>
                {that.renderChild()}
            </div>
        );
    }
}
