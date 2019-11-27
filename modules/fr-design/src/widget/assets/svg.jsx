/**
 *
 * @author tangzehua
 * @sine 2019-11-27 16:54
 */

// Header 返回按钮
export const back_chevron = ({color, height, width} = {}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="42px" viewBox="0 0 25 42"
         style={{height: height || 20, width: width || 16}}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-56.000000, -1197.000000)" fill={color || "#000033"} fillRule="nonzero">
                <g transform="translate(68.500000, 1217.500000) rotate(2.000000) translate(-68.500000, -1217.500000) translate(56.000000, 1197.000000)">
                    <polygon
                        points="7.05079509 20.499185 24.4650011 3.4420611 20.2994699 0 0 20.6609887 21.5267227 41 25 37.1257188"/>
                </g>
            </g>
        </g>
    </svg>
);
