/**
 *
 * @author tangzehua
 * @sine 2019-10-28 11:11
 */

import {ItemConst} from "../../components/item";
import {PropsConst} from "../../config/Attribute";
import {Form} from "fr-ui";

const textColor = "#000033";
const textSize = 12;

export const BaseTextConfig = () => [
    {
        title: "文本",
        type: ItemConst.Type.Header,
        config: [
            {
                form: PropsConst.textValue,
                type: Form.Const.Type.PanelInput,
            },
            [
                {
                    title: "字体",
                    type: Form.Const.Type.Select,
                    form: PropsConst.textSize,
                    titleDirection: Form.Const.Direction.Bottom,
                    style: {maxWidth: 60},
                    value: textSize,
                    select: {data: ItemConst.FontSize.options}
                },
                {
                    title: "颜色",
                    type: ItemConst.Type.Color,
                    form: PropsConst.textColor,
                    titleDirection: Form.Const.Direction.Bottom,
                    value: textColor,
                    handlePicker: PropsConst.widgetColorHandle,
                    style: {maxWidth: 50}
                },
                {
                    title: "对齐",
                    type: Form.Const.Type.Select,
                    form: PropsConst.textAlign,
                    titleDirection: Form.Const.Direction.Bottom,
                    select: {data: ItemConst.TextAlign.options}
                },
            ],
        ]
    },
];
