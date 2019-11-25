/**
 *
 * @author tangzehua
 * @sine 2019-11-20 10:46
 */

import {randomId} from "../../config";

/**
 * 转换widget到目标widget
 * @param {Array<string>} widgets 目标widget数组
 * @param {string} targetWidgetId 目标 widget
 * @param {string} widgetId 需要换位的 widget
 * @param {-1|1} dir 方向 -1 = 后面 1 = 前面
 * @returns []
 */
export function SwapWidget(widgets, targetWidgetId, widgetId, dir) {
    const widgetIx = widgets.indexOf(widgetId);
    const targetIx = widgets.indexOf(targetWidgetId);

    // 移动位置
    const move = () => {
        const newGroup = [];
        widgets.forEach(data => {
            if (data === widgetId) return;

            if (data === targetWidgetId) {
                dir !== 1 ? newGroup.push(data, widgetId) : newGroup.push(widgetId, data);
            } else {
                newGroup.push(data);
            }
        });
        return newGroup;
    };

    // 是否和目标widget 在同一个widget中
    if (targetIx !== -1 && widgetIx !== -1) {
        // 不需要移动
        if (targetIx - dir === widgetIx) {
            return widgets;
        }
        return move();
    }
    return widgets;
}

/**
 * 克隆widget数据, 用户复制
 * @param widgets
 * @returns {[]}
 * @constructor
 */
export function CloneWidget(widgets) {
    // 新的id
    const newIds = new Map();
    const newWidgets = [];

    function getId(id) {
        if (newIds.has(id)) {
            return newIds.get(id);
        } else {
            const nId = randomId();
            newIds.set(id, nId);
            return nId;
        }
    }

    function cloneIdObj(objValue = {}) {
        const nValue = {};
        for (const [key, value] of Object.entries(objValue)) {
            if (key === 'default') {
                nValue[key] = value;
            } else {
                nValue[getId(key)] = value;
            }
        }
        return nValue;
    }

    widgets.forEach(wi => {
        const {cid, event, states = [], widget = {}, props, children} = wi;

        const nEvent = cloneIdObj(event);
        const nProps = cloneIdObj(props);
        const nStates = states.map(da => ({...da, cid: getId(da.cid)}));
        const nChildren = Array.isArray(children) ? children.map(da => getId(da)) : children;
        const nWidget = {};
        for (const [key, value] of Object.entries(widget)) {
            nWidget[key] = getId(value);
        }

        newWidgets.push({
            ...wi,
            cid: getId(cid),
            event: nEvent,
            props: nProps,
            children: nChildren,
        });
    });
    return newWidgets;
}
