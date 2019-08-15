
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

/**
 * 修改版本号
 * @param {string} modulePath 模块路径
 * @param {number} type 类型,默认1. 1 = 增加, 0 = 撤销
 */
function updateVersion (modulePath, type = 1){
    //模块的package.json
    const packagePath = `${config.rootPath}/${modulePath}/package.json`;
    const packageConfig = require(packagePath);
    const version = getLastVersion(packageConfig.version);

    if (version !== packageConfig.version){
        try {
            packageConfig.version = version;
            fs.writeFileSync(packagePath, JSON.stringify(packageConfig, null, 2));
            console.log(`\n更新${config.module.toUpperCase()}的版本到:`, packageConfig.version)
        } catch (e) {
            console.error("update version error: " + e);
        }
    }
}

/**
 * 获取版本
 * @param version
 * @param type
 * @returns {*}
 */
function getLastVersion (version, type = 1){
    if (version && version.indexOf("-") !== -1){
        let lastIx = version.lastIndexOf(".");
        let lastVer = parseInt(version.substring(lastIx + 1, version.length));
        lastVer = type ===1 ? lastVer + 1: lastVer - 1;
        version = `${version.substring(0, lastIx)}.${lastVer}`;
    }
    return version;
}

module.exports = {
    updateVersion,
    getLastVersion
};
