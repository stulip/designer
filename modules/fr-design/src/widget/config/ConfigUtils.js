/**
 *
 * @author tangzehua
 * @sine 2019-11-20 10:46
 */

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
