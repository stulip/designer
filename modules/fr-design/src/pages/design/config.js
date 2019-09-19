/**
 *
 * @author tangzehua
 * @sine 2019-09-05 17:37
 */
import type {ConfigOption, PageConfig} from "./flow/Main.flow";

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
export const viewportScale = { x: 6, y: 3 };

// 驱动信息
const DEVICE_INFO = {
    App: [
        {
            name: "iPhone 6/7/8",
            width: 375,
            height: 667,
            top: 0,
            bottom: 0
        },
        {
            name: "iPhone 6/7/8 Plus",
            width: 414,
            height: 736,
            top: 0,
            bottom: 0
        },
        {
            name: "iPhone X",
            width: 375,
            height: 812,
            top: 44,
            bottom: 34
        },
        {
            name: "iPhone Xs Max",
            width: 414,
            height: 896,
            top: 44,
            bottom: 34
        }
    ],
    Web: [
        {
            name: "标准",
            width: 1200,
            height: 700,
            top: 0,
            bottom: 0
        },
        {
            name: "宽屏",
            width: 1440,
            height: 810,
            top: 0,
            bottom: 0
        }
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
