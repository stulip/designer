const path = require('path');
const fs = require('fs');
const {WebpackPluginServe} = require('webpack-plugin-serve');
const webpack = require('./webpack.config');
const argv = require('yargs').argv;

const mainPort = 1235;
const webpackHost = "127.0.0.1";
const mainHost = '0.0.0.0';// IPv4 IPv6

//单个模块信息
const moConfig = webpack.module.config || {path: ''};
if (!!webpack.module.name && !moConfig.port) {
    //没有找到模块配置就结束掉
    console.error("模块没有找到", webpack.module.name);
    process.exit(1);
}
// 编译模式
const mode = process.env.NODE_ENV;
const isDebug = mode !== 'production';
const isDev = argv.dev;

//设置NODE_ENV之后再引入webpack.config
const webPath = `./webpack.config.${webpack.module.name}.js`;
// 静态文件输出目录
const static_path = path.join(webpack.rootPath, 'dist', webpack.module.name);

if (webpack.isDebug) {
    webpack.config.plugins = [
        ...webpack.config.plugins,
        new WebpackPluginServe({
            historyFallback: true,
            compress: false,// gzip
            port: moConfig.port,
            liveReload: false,
            hmr: true,
            host: webpackHost,
            progress: false,
            status: false,
            // waitForBuild: true,
            // ramdisk: true,
            static: static_path,
        })
    ]
}

const context = path.join(webpack.rootPath, webpack.moduleRoot);
process.env.NODE_MODULE_PATH = path.join(context, webpack.modulePath);

module.exports = {
    ...webpack,
    host: mainHost,
    port: mainPort,
    webpack: {
        ...webpack.config,
        mode,
        watch: webpack.isDebug,
        watchOptions: {
            ignored: /node_modules/
        },
        // context: path.join(webpack.rootPath, moConfig.path),
        context,
        output: {
            ...webpack.config.output,
            path: static_path,
            publicPath: `${webpack.module.name}/`
        }
    }
};
