import {Form} from "fr-ui";
import {PropsConst} from "../../config/Attribute";

/**
 *
 * @author tangzehua
 * @sine 2019-10-28 14:35
 */

export const WidgetConfig = ({basic}) => [
    {form: "widget.name", type: Form.Const.Type.PanelInput, className: "widget-name"},
    {
        className: "ic-content",
        config: [
            [
                {
                    form: "widget.x",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: basic.widgetX.disabled,
                    input: {title: "X ", min: basic.widgetX.min, max: basic.widgetX.max}
                },
                {
                    form: "widget.y",
                    type: Form.Const.Type.ConfirmInputNumber,
                    disabled: basic.widgetY.disabled,
                    input: {title: "Y ", min: basic.widgetY.min, max: basic.widgetY.max}
                }
            ],
            [
                [
                    {
                        form: PropsConst.widgetWidth,
                        type: Form.Const.Type.ConfirmInputNumber,
                        disabled: data => !data[PropsConst.widgetInitialWidth] || basic.widgetWidth.disabled,
                        input: {title: "W", min: basic.widgetWidth.min, max: basic.widgetWidth.max},
                        className: "size-input",
                        union: `@${PropsConst.widgetInitialWidth}`,
                        listener: {
                            key: PropsConst.widgetSize,
                            getValue: da => da.width,
                            setValue: (width, data) => ({width, height: data[PropsConst.widgetHeight]})
                        }
                    },
                    {
                        type: Form.Const.Type.Switch,
                        form: PropsConst.widgetInitialWidth,
                        disabled: basic.widgetWidth.disabled,
                        className: 'size-check',
                    }
                ],
                [
                    {
                        form: PropsConst.widgetHeight,
                        type: Form.Const.Type.ConfirmInputNumber,
                        disabled: data => !data[PropsConst.widgetInitialHeight] || basic.widgetHeight.disabled,
                        input: {title: "H", min: basic.widgetHeight.min, max: basic.widgetHeight.max},
                        className: "size-input",
                        union: `@${PropsConst.widgetInitialHeight}`,
                        listener: {
                            key: PropsConst.widgetSize,
                            getValue: da => da.height,
                            setValue: (height, data) => ({height, width: data[PropsConst.widgetWidth]})
                        },
                    },
                    {
                        type: Form.Const.Type.Switch,
                        form: PropsConst.widgetInitialHeight,
                        disabled: basic.widgetHeight.disabled,
                        className: 'size-check',
                    }
                ]
            ]
        ]
    },
    {type: Form.Const.Type.Gap}
];
