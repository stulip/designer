import React from "react";

/**
 * svg
 * @author tangzehua
 * @sine 2019-09-02 18:13
 */

// 状态按钮
export const status_widget = [18, 18, '<path d="M9 18A9 9 0 1 1 9 0a9 9 0 0 1 0 18zm0-2A7 7 0 1 0 9 2a7 7 0 0 0 0 14zm0-3a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>'];
// 箭头
export const arrow_right = [8, 8, '<path d="M5 4L0 0v8z"/>'];
export const arrow_right2 = [12, 12, '<path d="M9 6l-5 4V2z"/>'];
// 圆边框 新增
export const plus_o = [14, 14, '<path d="M6.01 6L6 4h2l.01 2H10v2H8.019l.009 1.917h-2L6.018 8H4V6h2.01zM7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14zm0-2A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"/>'];
// 垃圾桶
export const trash = [10, 12, '<path d="M1 4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4H1z"/><path d="M4 1V.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5V1h3a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2h3z"/>'];

/**
 * 背景格子
 * @param {number} [size] grid 大小
 * @param {number} [scale] 缩放率
 * @param {number} [radius] 圆角
 * @returns {*}
 */
export const small_grid = (size = 1, scale = 1, radius = 0) => {
    const gridWidth = 2.5 * size * scale,
        width = 0.5 * size * scale;
    return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{borderRadius: radius}}>
            <defs>
                <pattern id="smallGrid" width={width} height={width} patternUnits="userSpaceOnUse">
                    <path
                        d={`M ${width} 0 L 0 0 0 ${width}`}
                        fill="none"
                        stroke="rgba(207, 207, 207, 0.3)"
                        strokeWidth="1"
                    />
                </pattern>
                <pattern id="grid" width={gridWidth} height={gridWidth} patternUnits="userSpaceOnUse">
                    <rect width={gridWidth} height={gridWidth} fill="url(#smallGrid)" />
                    <path
                        d={`M ${gridWidth} 0 L 0 0 0 ${gridWidth}`}
                        fill="none"
                        stroke="rgba(186, 186, 186, 0.5)"
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    );
};

// 信号
export const status_bar_signal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="12">
        <path
            d="M1.25 6.5h1a1 1 0 0 1 1 1V10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1zM5.75 5h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4.5-2h1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm4.5-2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
            fillRule="evenodd"
        />
    </svg>
);

// wifi
export const status_bar_wifi = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12">
        <path
            d="M8.007 2.787a8.64 8.64 0 0 1 5.953 2.379c.12.118.314.116.433-.004l1.156-1.166a.322.322 0 0 0-.003-.456 10.897 10.897 0 0 0-15.08 0 .322.322 0 0 0-.003.456L1.62 5.162c.119.12.312.122.433.004a8.641 8.641 0 0 1 5.954-2.379zm0 3.796c1.217 0 2.391.452 3.294 1.27a.31.31 0 0 0 .433-.006l1.155-1.167a.322.322 0 0 0-.005-.459 7.16 7.16 0 0 0-9.752 0 .322.322 0 0 0-.005.46l1.155 1.166a.31.31 0 0 0 .433.006 4.907 4.907 0 0 1 3.292-1.27zm2.219 2.784a.314.314 0 0 0-.01-.457 3.422 3.422 0 0 0-4.42 0 .314.314 0 0 0-.009.457l1.998 2.016a.312.312 0 0 0 .443 0l1.998-2.016z"
            fillRule="nonzero"
        />
    </svg>
);

// 电池
export const status_bar_battery = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="12">
        <path
            d="M2.667 1.333C1.747 1.333 1 2.08 1 3v6c0 .92.746 1.667 1.667 1.667h16.666C20.253 10.667 21 9.92 21 9V3c0-.92-.746-1.667-1.667-1.667H2.667zm0-1h16.666A2.667 2.667 0 0 1 22 3v6a2.667 2.667 0 0 1-2.667 2.667H2.667A2.667 2.667 0 0 1 0 9V3A2.667 2.667 0 0 1 2.667.333z"
            opacity=".35"
        />
        <path d="M23 4v4a2.17 2.17 0 0 0 0-4" opacity=".4" />
        <rect x="2" y="2.333" width="18" height="7.333" rx="1.333" />
    </svg>
);
