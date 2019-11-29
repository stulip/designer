/**
 *
 * @author tangzehua
 * @sine 2019-11-29 11:00
 */

import {Form} from "fr-ui";
import {PropsConst} from "../../config";
import {ItemConst} from "../../components/item";

export const RootConfig = (props) => {
    const {canvasRect, designRect} = props;
    return [
        {
            className: "appearance-panel",
            config: [
                [
                    {
                        form: PropsConst.canvasWidth,
                        type: Form.Const.Type.IBotConfirmInputNumber,
                        value: canvasRect.width,
                        disabled: true,
                        input: {
                            title: "宽",
                            min: designRect.width
                        },
                        listener: {
                            key: PropsConst.canvasSize,
                            getValue: da => da.width,
                            setValue: (width, data) => ({width, height: data[PropsConst.canvasHeight]})
                        },
                    },
                    {
                        form: PropsConst.canvasHeight,
                        type: Form.Const.Type.IBotConfirmInputNumber,
                        value: canvasRect.height,
                        input: {
                            title: "高",
                            min: designRect.height
                        },
                        listener: {
                            key: PropsConst.canvasSize,
                            getValue: da => da.height,
                            setValue: (height, data) => ({height, width: data[PropsConst.canvasWidth]})
                        },
                    }
                ],
                {type: Form.Const.Type.Gap},
                {
                    title: "背景颜色",
                    type: ItemConst.Type.Background,
                    form: PropsConst.background,
                    listener: PropsConst.background,
                    handlePicker: PropsConst.widgetColorHandle
                },
            ]
        }
    ]
};
