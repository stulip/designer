// 放第一行
process.env.NODE_ENV = "production";

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const argv = require('yargs').argv; //命令行参数
const webpack = require('webpack');
const chalk = require('chalk');
const detect = require('detect-port');
const config = require('../config');
const {updateVersion} = require('./utils');
const compiler = webpack(config.webpack);

//webpack build progress
if (argv.progress !== 'false') {
    new webpack.ProgressPlugin({ profile: false }).apply(compiler);
}

//备份di
const dist = path.join(config.webpack.output.path, '..');
const backDistPath = path.join(dist, '_' + config.module.name);

//⬡ ⬢
const logPrefix = {ok: chalk.blue('webpack:'), whoops: chalk.red('webpack:')};
const log = {
    error: (...args) => {
        if (argv.silent) return;
        args.unshift(logPrefix.whoops);
        console.error(...args);
    },
    info: (...args) => {
        if (argv.silent) return;
        args.unshift(logPrefix.ok);
        console.error(...args);
    }
};

/**
 * webpack编译
 */
async function main (){
    if (await detect(config.module.config.port) !== config.module.config.port) {
        log.error(`编译失败, 请先停止[${chalk.blue(config.module.name)}]模块服务!`);
        process.exit(0);
    }

    //clean dist output module
    fs.existsSync(backDistPath) && fse.removeSync(backDistPath);
    if (!argv.release &&  fs.existsSync(config.webpack.output.path)){
        fs.renameSync(config.webpack.output.path, backDistPath)
    }

    compiler.run(async (err, stats)=> {
        if (err) {
            try{
                await revertBuild();
            } catch (e) {}
            log.error(err.stack || err);
            if (err.details) log.error(err.details);
            process.exit(1); // eslint-disable-line
        }
        if (stats.compilation.errors.length) {
            try{
                await revertBuild();
            } catch (e) {}
            log.error(stats.compilation.errors);
            process.exit(1); // eslint-disable-line
        }
        fs.existsSync(backDistPath) && fse.removeSync(backDistPath);
        // updateVersion(config.moConfig.path);
        log.info("编译模块", chalk.blue(config.module.name.toUpperCase()), "成功!");
    });
}

/**
 * 回滚编译
 */
async function revertBuild (){
    await fs.exists(backDistPath) && fs.moveSync(backDistPath, config.webpack.output.path);
}

main();
