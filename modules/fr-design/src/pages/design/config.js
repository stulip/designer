/**
 *
 * @author tangzehua
 * @sine 2019-09-05 17:37
 */


// 视口最小尺寸
export const viewMinSize = Object.freeze({width: 600, height: 500});

const config = {
    // 层大小(iPhone X)
    screenSize: {
        width: 375,
        height: 812,
    },
};

export const createConfig = (options)=> {
    return config;
};
