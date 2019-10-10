/**
 *
 * @author tangzehua
 * @sine 2019-10-10 14:24
 */

// @flow
import React from 'react';


type Props = {
    width: number,
    height: number
};

export function Header(props: Props) {

    const {height, width} = props;
    return (
        <div className="group-flow" style={{ top: 0, left: 0, width, height, zIndex: 3 }}>
            <div
                className="status-bar"
                style={{
                    width,
                    height,
                    left: 0,
                    top: 0,
                    zIndex: 3,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    opacity: 1,
                    transform: "rotate(0deg)"
                }}
            >
                <div className="mobile-status-bar">
                    123
                </div>
            </div>
        </div>
    );
}
