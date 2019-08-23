const path = require('path');
const fs = require('fs');
const {WebpackPluginServe} = require('webpack-plugin-serve');
const webpack = require('./webpack.config');

const mainPort = 1234;
const mainHost = '127.0.0.1';// IPv4 IPv6


//单个模块信息
const moConfig = webpack.module.config || {path: ''};
if (!!webpack.module.name && !moConfig.port) {
    //没有找到模块配置就结束掉
    console.error("模块没有找到", webpack.module.name);
    process.exit(1);
}

//设置NODE_ENV之后再引入webpack.config
const webPath = `./webpack.config.${webpack.module.name}.js`;

if (webpack.isDebug){
    webpack.config.plugins = [
        ...webpack.config.plugins,
        new WebpackPluginServe({
            historyFallback: true,
            compress: false,// gzip
            port: moConfig.port,
            liveReload: false,
            hmr: true,
            host: mainHost,
            progress: true,
            static: path.join(webpack.rootPath, `/dist/${webpack.module.name}`),
        })
    ]
}


module.exports = {
    ...webpack,
    host: mainHost,
    port: mainPort,
    webpack: {
        ...webpack.config,
        mode: process.env.NODE_ENV,
        watch: webpack.isDebug,
        watchOptions: {
            ignored: /node_modules/
        },
        // context: path.join(webpack.rootPath, moConfig.path),
        context: path.join(webpack.rootPath, webpack.moduleRoot),
        output: {
            ...webpack.config.output,
            path: path.join(webpack.rootPath, 'dist', webpack.module.name),
            publicPath: `${webpack.module.name}/`
        }
    }
};
