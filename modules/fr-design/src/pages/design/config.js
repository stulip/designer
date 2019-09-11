/**
 *
 * @author tangzehua
 * @sine 2019-09-05 17:37
 */

// 视口最小尺寸
export const viewMinSize = Object.freeze({ width: 600, height: 500 });
// 滚动条最小长度
export const scrollbarMinWidth = 100 / 10;
export const scrollbarThick = 16;

// 视图缩放比例
export const zoomScale = {
    normal: 1,
    interval: Object.freeze([.2, .3, .5, .75, .8, .9, 1, 1.2, 1.5, 2, 3, 4]),
    getInterval: function(value) {
        const interval = this.interval;
        let lastValue, nextValue;
        for (let i = 0, j = interval.length; i < j; i++){
            nextValue = lastValue = interval[i];
            if (lastValue >= value){
                lastValue = interval[i > 0? i - 1: 0];
                if (nextValue === value){
                    nextValue = interval[i < j - 1 ? i + 1: i];
                }
                break;
            }
        }
        return [lastValue, nextValue];
    }
};

// 视区按照screen尺寸放大倍数
export const viewportScale ={ x: 6, y: 3 };

const config = {
    // 层大小(iPhone X)
    screenSize: {
        width: 375,
        height: 812 //812
    }
};

export const createConfig = options => {
    return config;
};
