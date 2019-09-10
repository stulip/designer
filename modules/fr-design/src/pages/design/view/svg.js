import React from "react";

/**
 * svg
 * @author tangzehua
 * @sine 2019-09-02 18:13
 */

export const common_widget = [18, 18, "<path d=\"M9 18A9 9 0 1 1 9 0a9 9 0 0 1 0 18zm0-2A7 7 0 1 0 9 2a7 7 0 0 0 0 14zm0-3a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z\"></path>"];


export const small_grid = ()=> (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <pattern id="smallGrid" width="18" height="18" patternUnits="userSpaceOnUse">
                <path
                    d="M 18 0 L 0 0 0 18"
                    fill="none"
                    stroke="rgba(207, 207, 207, 0.3)"
                    strokeWidth="1"
                />
            </pattern>
            <pattern id="grid" width="90" height="90" patternUnits="userSpaceOnUse">
                <rect width="90" height="90" fill="url(#smallGrid)"/>
                <path
                    d="M 90 0 L 0 0 0 90"
                    fill="none"
                    stroke="rgba(186, 186, 186, 0.5)"
                    strokeWidth="1"
                />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
);
