/**
 * 滚动视区
 * @author tangzehua
 * @sine 2019-09-04 11:01
 */

//@flow
import * as React from "react";
import "../assets/scrollbar.pcss";

type Props = {};
type State = {};

// 滚动条长度
const width = 100 / 3;
// 最大
const maxVec = 100 - width;

/**
 *
 * @param {number} x [0, 1] X 轴
 * @param {number} y [0, 1] Y 轴
 * @returns {*}
 * @constructor
 */
export const ScrollBar = ({x = 0, y = 0}) => {
    const scrollX = Math.min(maxVec, x * maxVec);
    const scrollY = Math.min(maxVec, y * maxVec);
    return (
        <div className={"scroll-bar"}>
            <div data-axis={"x"} className={"track x-track"}>
                <div className={"handler"} style={{width: width + '%', left: scrollX + "%"}}>
                    <div className={"thumb"}/>
                </div>
            </div>
            <div data-axis={"y"} className={"track y-track"}>
                <div className={"handler"} style={{height: width + '%', top: scrollY + "%"}}>
                    <div className={"thumb"}/>
                </div>
            </div>
        </div>
    )
};
