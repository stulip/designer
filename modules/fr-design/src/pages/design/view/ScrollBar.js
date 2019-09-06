/**
 * 滚动视区
 * @author tangzehua
 * @sine 2019-09-04 11:01
 */

//@flow
import * as React from "react";
import "../assets/scrollbar.pcss";

/**
 *
 * @param {number} x [0, 1] X 轴
 * @param {number} y [0, 1] Y 轴
 * @param {{width: number, height: number, vecX: number, vecY: number}} size 滚动条尺寸
 * @returns {*}
 * @constructor
 */
export const ScrollBar = ({x = 0, y = 0, size}) => {
    const scrollX = Math.min(size.vecX, x * size.vecX);
    const scrollY = Math.min(size.vecY, y * size.vecY);
    return (
        <div className={"scroll-bar"}>
            <div data-axis={"x"} className={"track x-track"}>
                <div className={"handler"} style={{width: size.width + '%', left: scrollX + "%"}}>
                    <div className={"thumb"}/>
                </div>
            </div>
            <div data-axis={"y"} className={"track y-track"}>
                <div className={"handler"} style={{height: size.height + '%', top: scrollY + "%"}}>
                    <div className={"thumb"}/>
                </div>
            </div>
        </div>
    )
};
