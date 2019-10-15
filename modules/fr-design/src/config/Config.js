/**
 *
 * @author tangzehua
 * @sine 2019-09-24 10:26
 */
import {Types} from "@xt-web/core";
import type {ConfigOption, PageConfig} from "../flow/Main.flow";

// 视口最小尺寸
export const viewMinSize = Object.freeze({ width: 100, height: 100 });
// 滚动条最小长度
export const scrollbarMinWidth = 100 / 10;
export const scrollbarThick = 16;

// 视图缩放比例
export const zoomScale = {
    normal: 1,
    interval: Object.freeze([0.2, 0.3, 0.5, 0.75, 0.8, 0.9, 1, 1.2, 1.5, 2, 3, 4]),
    getInterval: function(value) {
        const interval = this.interval;
        let lastValue, nextValue;
        for (let i = 0, j = interval.length; i < j; i++) {
            nextValue = lastValue = interval[i];
            if (lastValue >= value) {
                lastValue = interval[i > 0 ? i - 1 : 0];
                if (nextValue === value) {
                    nextValue = interval[i < j - 1 ? i + 1 : i];
                }
                break;
            }
        }
        return [lastValue, nextValue];
    }
};

// 视区按照screen尺寸放大倍数
export const viewportScale = { x: 3, y: 2 };

export const ENUM = {
    DESIGN_SCALE: "design_scale",
    DESIGN_GRID: 'design_grid',

    ZOOM_M: 1,
    ZOOM_P: 2,
};

function createDevice (options){
    return {
        type: 'pc',
        width: 0,
        height: 0,
        top: 0,
        bottom: 0,
        ...options,
    }
}

// 驱动信息
const DEVICE_INFO = {
    App: [
        createDevice({
            name: "iPhone 6/7/8",
            type: 'iphone',
            width: 375,
            height: 667,
        }),
        createDevice({
            name: "iPhone 6/7/8 Plus",
            type: 'iphone_plus',
            width: 414,
            height: 736,
        }),
        createDevice({
            name: "iPhone X",
            type: 'iphone_x',
            width: 375,
            height: 812,
            top: 44,
            bottom: 34,
        }),
        createDevice({
            name: "iPhone Xs Max",
            type: 'iphone_xs_max',
            width: 414,
            height: 896,
            top: 44,
            bottom: 34,
        })
    ],
    Web: [
        createDevice({
            name: "标准",
            width: 1200,
            height: 700,
        }),
        createDevice({
            name: "宽屏",
            width: 1440,
            height: 810,
            top: 0,
            bottom: 0
        })
    ]
};

// 根据参数创建配置信息
export const createConfig = (options: ConfigOption): PageConfig => {
    const config: PageConfig = {};
    const {isApp, } = options;
    config.isApp = isApp;

    if (isApp){
        // 先写上,默认iPhone X
        config.designRect = DEVICE_INFO.App[2];
    } else {
        config.designRect = DEVICE_INFO.Web[0];
    }
    // 目前没有保存画布大小, 取驱动大小
    config.canvasSize = config.designRect;
    return config;
};

export class LocalData {

    /**
     * 获取存储本地的值
     * @param {string} key
     * @param {*} [defaultValue]
     * @returns {string}
     */
    static getItem (key, defaultValue){
        const value = localStorage.getItem(key);
        return Types.isEmpty(value) ? defaultValue: value;
    }

    /**
     * 获取存储本地的Int值
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    static getIntItem (key, defaultValue){
        const value = this.getItem(key, defaultValue);
        return Types.isEmpty(value) ? value: parseInt(value);
    }

    /**
     * 获取存储本地的Float值
     * @param key
     * @param defaultValue
     * @returns {*}
     */
    static getFloatItem (key, defaultValue){
        const value = this.getItem(key, defaultValue);
        return Types.isEmpty(value) ? value: parseFloat(value);
    }

    /**
     * 获取存储本地的对象值
     * @param {string} key
     * @param {Object|Array} [defaultValue]
     * @returns {Object}
     */
    static getObjectItem (key, defaultValue){
        const value = this.getItem(key);
        return Types.isEmpty(value) ? defaultValue: JSON.parse(value);
    }

    /**
     * 保存数据到本地
     * @param {string} key
     * @param {*} [value]
     */
    static setItem (key, value){
        if (Types.isEmpty(value)){
            this.removeItem(key);
        } else {
            if ( !Types.isNumber(value) || !Types.isString(value)) {
                value = JSON.stringify(value);
            }
            localStorage.setItem(key, String(value));
        }
    }

    /**
     * 删除本地数据
     * @param key
     */
    static removeItem (key){
        localStorage.removeItem(key);
    }
}
