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
export const zoomScale = { max: 4, min: 0.2 };

const config = {
    // 层大小(iPhone X)
    screenSize: {
        width: 375,
        height: 812 //812
    },
    // 视区按照screen尺寸放大倍数
    viewportScale: { x: 6, y: 3 }
};

export const createConfig = options => {
    return config;
};
