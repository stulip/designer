/**
 * babel 配置
 */
const path = require('path');

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    esmodules: true
                }
            }
        ],
        "@babel/preset-react",
        "@babel/preset-flow"
    ],
    plugins: [
        [
            "babel-plugin-root-import",
            {
                rootPathSuffix: path.join(process.env.NODE_MODULE_PATH, 'src')
            }
        ],
        ["lodash"],
        [
            "@babel/plugin-transform-runtime",
            {
                corejs: false,
                helpers: false,
                regenerator: true,
                useESModules: true
            }
        ],
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        [
            "import",
            {
                libraryName: "antd",
                libraryDirectory: "lib", // default: lib
                style: "css"
            }
        ]
    ],
    env: {
        production: {
            plugins: [["transform-react-remove-prop-types", { removeImport: true, classNameMatchers: ["Shape"] }]]
        },
        development: {
            plugins: [["react-hot-loader/babel"]]
        }
    }
};
