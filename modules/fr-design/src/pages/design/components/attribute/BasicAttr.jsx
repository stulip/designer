/**
 * 基础属性
 * @author tangzehua
 * @sine 2019-09-29 10:47
 */

// @flow
import React from "react";
import { Form } from "fr-ui";
import { DesignEvent } from "fr-web";
import { EventConst } from "../../../../config/Attribute";
import { observer } from "mobx-react";
import type { Size } from "../../../../flow/Main.flow";
import { ItemConst } from "../item";

type Props = {};

type State = {};

export class BasicAttr extends React.PureComponent<Props, State> {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.config = this.createEditConfig();
    }

    get form(): Form.View {
        return this.formRef.current;
    }

    componentDidMount() {
        let that = this;
        DesignEvent.addListener(EventConst.canvasSize, that.onReSize);
        DesignEvent.addListener(EventConst.background, that.onBackground);
    }

    componentWillUnmount() {
        let that = this;
        DesignEvent.removeListener(EventConst.canvasSize, that.onReSize);
        DesignEvent.removeListener(EventConst.background, that.onBackground);
    }

    /**
     *
     * @param {Size} size
     */
    onReSize = (size: Size) => {
        this.form.setFormData({ "canvas.width": size.width, "canvas.height": size.height }, { isChange: false });
    };

    onBackground = (color: string) => {
        this.form.setFormData({ background: color }, { isChange: false });
    };

    /**
     * 高度改变
     * @param value
     */
    handleHeight = (value: string) => {
        const { canvasRect } = this.props.store.main.section;
        this.props.store.handleCanvasSize({ height: value, width: canvasRect.width });
    };

    /**
     * 宽度改变
     * @param value
     */
    handleWidth = (value: string) => {
        const { canvasRect } = this.props.store.main.section;
        this.props.store.handleCanvasSize({ width: value, height: canvasRect.height });
    };

    /**
     * 背景颜色改变
     * @param value
     */
    handleBackground = value => {
        this.props.store.handleBackground(value);
    };

    createEditConfig() {
        let that = this;
        let store = that.props.store;
        const {section} = store.main;
        const { canvasRect, gridAttribute} = section;
        const { config, pageData } = store.main;
        return [
            [
                {
                    form: "canvas.width",
                    type: Form.Const.Type.ConfirmInputNumber,
                    value: canvasRect.width,
                    input: {
                        title: "宽",
                        disabled: true,
                        min: config.designRect.width
                    },
                    onChange: that.handleWidth
                },
                {
                    form: "canvas.height",
                    type: Form.Const.Type.ConfirmInputNumber,
                    value: canvasRect.height,
                    input: {
                        title: "高",
                        min: config.designRect.height
                    },
                    onChange: that.handleHeight
                }
            ],
            { type: Form.Const.Type.Line },
            {
                title: "背景颜色",
                type: ItemConst.Type.Background,
                form: "background",
                value: pageData.backgroundColor,
                onChange: that.handleBackground,
                handlePicker: store.main.handleBackgroundColor
            },
            { type: Form.Const.Type.Line, top: 10, },
            {
                title: "网格",
                type: ItemConst.Type.GridSetting,
                form: "gridSize",
                value: gridAttribute,
                onChange: section.setGridAttribute,
                grid: {max: 100}
            },
            { type: Form.Const.Type.Line, top: 10, },
        ];
    }

    render() {
        return (
            <div className={"appearance-panel"}>
                <Form.View config={this.config} ref={this.formRef} />
            </div>
        );
    }
}
