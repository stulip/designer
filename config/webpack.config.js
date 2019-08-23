const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const webpack = require('./webpack.config.base');

//HTML 模板
function templateParameters(compilation, assets, options) {
    const publicPath = compilation.options.output.publicPath;
    const blockList = Object.keys(webpack.module.block);
    return {
        compilation: compilation,
        webpack: compilation.getStats().toJson(),
        webpackConfig: compilation.options,
        htmlWebpackPlugin: {files: assets, options: options},
        externals: {
            scripts: function () {
                if (webpack.isRelease) return '';
                let child = da => `<script type="text/javascript" src="${da}/js/${webpack.entryName}.js?${compilation.hash}"></script>`;
                return blockList.map(child).join("\n\t");
            },
            css: function () {
                if (webpack.isRelease) return '';
                let child = da => `<link href="${da}/css/${webpack.entryName}.css?${compilation.hash}" rel="stylesheet">`;
                return blockList.map(child).join("\n\t");
            },
            libs: () => `${publicPath}js/${webpack.libs.name}.js?${compilation.hash}`,
            path: name => `${publicPath}${name}`
        }
    }
}

const webConfig = {
    ...webpack.config,
    entry: {
        [webpack.entryName]: [
            require.resolve('./polyfills'),
            require.resolve('@xt-web/react'),
            require.resolve('@xt-web/react-dom'),
            ...webpack.config.entry[webpack.entryName]
        ],
    },
    resolve: {
        ...webpack.config.resolve,
        modules: ["src", 'node_modules']
    },
    plugins: [
        ...webpack.config.plugins,
        new HtmlWebpackPlugin({
            base: '/',
            filename: '../index.html',
            minify: true,
            hash: true,
            inject: 'body',
            // excludeChunks: [config.entryName],
            // chunksSortMode: function (a, b) {
            //     return webpack.isDebug;
            // },
            template: `${webpack.rootPath}/static/index.ejs`,
            // favicon: `${webpack.rootPath}/static/favicon.ico`,
            templateParameters,
        }),
        new MergeIntoSingleFilePlugin({
            files: [
                {
                    src: Object.values(webpack.libs.cdn).filter(da => !!da.from).map(cdn => (
                        require.resolve(path.join(webpack.rootPath, `${cdn.from}${!~cdn.from.indexOf(".") ? "/" + cdn.name : ''}`))
                    )),
                    dest: `js/${webpack.libs.name}.js`
                }
            ],
            // transform: {
            //     [`js/${webpack.libs.name}.js`]: code=> code.replace("global.ReactRouter,", "global.ReactRouterDOM,")
            // },
        }),
        // new CopyWebpackPlugin(
        //     Object.values(webpack.libs.cdn).filter(da => !!da.from).map(cdn => ({
        //         from: require.resolve(path.join(webpack.rootPath, `${cdn.from}${!~cdn.from.indexOf(".")? "/" + cdn.name: ''}`)),
        //         to: `${cdn.to}`
        //     }))
        // ),
        new CopyWebpackPlugin(
            [
                // {from: path.join(webpack.rootPath, 'static', 'js'), to: 'js'},
                // {from: path.join(webpack.rootPath, 'static', 'images'), to: 'images'},
                {from: path.join(webpack.rootPath, 'static', 'favicon.ico'), to: '../'}
            ]
        ),
        // new CopyWebpackPlugin([{from: 'entry.js', to: 'js/entry.js'}]),
    ],
};

if(webpack.module.name === 'web'){
    webpack.config = webConfig;
}

module.exports = webpack;
