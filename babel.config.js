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
                    // "chrome": "76",
                    browsers: [
                        "last 2 Chrome versions"
                    ]
                },
                ignoreBrowserslistConfig: true,
            }
        ],
        "@babel/preset-react",
        "@babel/preset-flow"
    ],
    plugins: [
        ["lodash"],
        // [
        //     "@babel/plugin-transform-runtime",
        //     {
        //         corejs: false,
        //         helpers: false,
        //         regenerator: false,
        //         useESModules: true
        //     }
        // ],
        ["@babel/plugin-proposal-decorators", {legacy: true}],
        ["@babel/plugin-proposal-class-properties", {loose: true}],
        ["@babel/plugin-proposal-optional-chaining", {loose: true}],
        ["@babel/plugin-proposal-function-bind"],
        ["@babel/plugin-proposal-export-namespace-from"],
        // [
        //     "import",
        //     {
        //         libraryName: "antd",
        //         libraryDirectory: "lib", // default: lib
        //         style: "css"
        //     }
        // ]
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
