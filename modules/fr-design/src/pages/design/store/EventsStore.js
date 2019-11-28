/**
 * 事件
 * @author tangzehua
 * @sine 2019-11-28 15:00
 */
import {BaseStore} from "./BaseStore";

export class EventsStore extends BaseStore {

    /**
     * 初始化
     * @param {PageConfig} config 页面配置信息
     * @param {{data: PageData }} [options]
     */
    init(config, options = {}) {
        let that = this;
    }

    /**
     * 添加事件
     * @param event
     */
    handleAddEvent = (event: MouseEvent) => {
        const that = this;
        const {viewGroup} = that.main;
        if (viewGroup.widget) {
            console.log('widget 事件')
        } else {
            console.log('全局事件')
        }
    }
}
