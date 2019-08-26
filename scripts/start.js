
// 放第一行
process.env.NODE_ENV = "development";

const fs = require('fs-extra');
const path = require('path');
const http = require("http");
const detect = require('detect-port');
const Koa = require("koa");
const koaStatic = require('koa-static');
const chalk = require('chalk');
const proxy = require('http-proxy-middleware');
const compress = require('compression');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const argv = require('yargs').argv; //命令行参数
const config = require('../config');

const bufferReg = /(image|woff|eot|ttf)/;
//调试模式下,替换路径
const devCDNPath = {
    "react.production.min": "node_modules/react/umd/react.development.js",
    "react-dom.production.min": "node_modules/react-dom/umd/react-dom.development.js"
};
const logPrefix = {ok: chalk.blue('⬡ webpack:'), whoops: chalk.red('⬢ webpack:')};
const log = {
    error: (...args) => {
        args.unshift(logPrefix.whoops);
        console.error(...args);
    },
    info: (...args) => {
        args.unshift(logPrefix.ok);
        console.error(...args);
    }
};

//启动 webpack-serve 服务
async function webStart() {
    const webpack = require('webpack');
    const compiler = webpack(config.webpack);
    if (await detect(config.module.config.port) !== config.module.config.port) {
        log.error(`启动失败, 端口 ${config.module.config.port} 已存在!`);
        process.exit(0);
    }
    if (await detect(config.port) === config.port) {
        await mainServer();
    }

    //clean dist output module
    // 如果是内存选择就不需要删除dist
    fs.removeSync(config.webpack.output.path);

    let lastHash, watchConfig = true;
    compiler.watch({}, async (fatal, stats)=> {
        const hasErrors = stats && stats.hasErrors();

        process.exitCode = Number(!!fatal || (hasErrors && !watchConfig));

        if (fatal) {
            log.error(fatal);
            return;
        }

        if (lastHash === stats.hash) {
            log.info(chalk`{dim ⁿᵃⁿᵒ} Duplicate build detected {dim (${lastHash})}\n`);
            return;
        }

        lastHash = stats.hash;

        const statsDefaults = { colors: chalk.supportsColor.hasBasic, exclude: ['node_modules'] };
        const { options = {} } =
        []
            .concat(compiler.compilers || compiler)
            .reduce((a, c) => c.options.stats && c.options.stats) || {};
        const statsOptions =
            !options.stats || typeof options.stats === 'object'
                ? Object.assign({}, statsDefaults, options.stats)
                : options.stats;
        const result = stats.toString(statsOptions);

        // indent the result slightly to visually set it apart from other output
        log.info(result.split('\n').join('\n  '), '\n');
    });
}

//--------------------------------

//启动代理服务
async function mainStart() {
    const _port = await detect(config.port);
    if (_port !== config.port) {
        log.error(`启动失败, 端口 ${config.port} 已存在!`);
        process.exit(1);
    }
    await mainServer();
}

async function mainServer() {

    const app = new Koa();
    app.use(convert(compress()));
    // router *must* be the last middleware added
    config.proxy.forEach(proxyConfig => {
        proxyConfig.pathRewrite = (path, req) => {
            return path.replace(/\/\[[\w\d.:]+]/g, '');
        };
        proxyConfig.router = (req) => {
            return proxyConfig.target + req.url.match(/[\w\d.:]+/g)[0]
        };
        app.use(convert(proxy(proxyConfig.context, proxyConfig)));
    });
    app.use(convert(history()));
    app.use(mainCtx);
    app.use(koaStatic(`${config.rootPath}/dist`));
    // app.use(koaStatic(`${config.rootPath}/dist/web`));

    http.createServer(app.callback()).listen(config.port, config.host);

    log.info("服务启动完成:", chalk.blue(`http://${config.host}:${config.port}`));
}

//代理
async function mainCtx(ctx, next) {
    await next();
    if (ctx.path === '/index.html') {
        ctx.body && await writeBody(ctx, fs.readFileSync(ctx.body.path, "utf-8"));
    }
}

async function devPath(ctx, filepath) {
    //如果是调试模式, 改用React为DEV版本
    // for (let [key, value] of Object.entries(devCDNPath)) {
    //     if (ctx.url.indexOf(key) !== -1) {
    //         return value;
    //     }
    // }
    return filepath
}

//根据类型输出
async function writeBody(ctx, body) {
    if (bufferReg.test(ctx.type)) {
        // 如果是图片，则用node原生res，输出二进制数据
        ctx.res.writeHead(200);
        ctx.res.write(body, 'binary');
        ctx.res.end()
    } else {
        ctx.body = ctx.url === '/index.html' ? await writeDevInfo(body) : body;
        // ctx.body = ctx.url === '/' ? await writeDevInfo(body) : body;
    }
}

async function appendTest() {
    if (argv.test) {
        return `
<link href="/dist/test/css/index.css" rel="stylesheet">
<script>window.__webpackHotClient__ = null;</script>
<script type="text/javascript" src="/dist/test/js/index.js"></script>`;
    }
    return '';
}

async function writeDevInfo(body) {
    let modInfo = {};
    for (let [name, value] of Object.entries(config.module.list)) {
        const _port = await detect(value.port);
        modInfo[name.toUpperCase()] = {
            online: _port !== value.port
        }
    }
    let devLog = `
<script>
    console.group && (function(){
        let modInfo = ${JSON.stringify(modInfo)};
        let colors = ["#999966", "#9933CC", "#CCCC66", "#990033", "#9999CC", "#660066", "#0066CC"], i = 0;
        console.group("%c前端模块化工程", "color:#CC0033;");
        for(let module in xt) {
            let ver = xt[module].version;
            let online = modInfo[module.toUpperCase()].online;
            console.log("(%c" + (online? '在线': '离线') + ") %c" + module +": \t" + ver, "color:" + (online?'#CCCC66':'red'), 'color:' + colors[i]);
            i = (i + 1) === colors.length? 0: (i + 1);
        }
        console.groupEnd();
    })();
</script>
`;
    return body.replace("</html>", `${await appendTest()}${devLog}</html>`);
}

!!argv.module ? webStart() : mainStart();
