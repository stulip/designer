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
    {type: Form.Const.Type.Line, top: 0},
    {
        form: PropsConst.textValue,
        type: Form.Const.Type.IBotInput,
        className: "text-input"
    },
    [
        {
            title: "字体",
            type: Form.Const.Type.IBotSelect,
            form: PropsConst.textSize,
            titleDirection: Form.Const.Direction.Bottom,
            style: {maxWidth: 70},
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
            type: Form.Const.Type.IBotSelect,
            form: PropsConst.textAlign,
            titleDirection: Form.Const.Direction.Bottom,
            select: {data: ItemConst.TextAlign.options}
        }
    ],
    [
        {
            title: "字间距",
            type: Form.Const.Type.IBotInputNumber,
            form: PropsConst.textLetterSpacing,
            titleDirection: Form.Const.Direction.Bottom,
            input: {step: 0.1}
        },
        {
            title: "行距",
            type: Form.Const.Type.IBotInputNumber,
            form: PropsConst.textLineHeight,
            titleDirection: Form.Const.Direction.Bottom,
            input: {min: 12}
        },
        {
            title: "粗细",
            type: Form.Const.Type.IBotSelect,
            form: PropsConst.textWeight,
            titleDirection: Form.Const.Direction.Bottom,
            select: {data: ItemConst.FontWeight.options}
        }
    ]
];
