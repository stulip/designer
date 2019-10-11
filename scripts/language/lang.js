const xlsx = require('./../xlsx2json/lib/xlsx-to-json.js');
const appRootPath = require("app-root-path");
const path = require("path");
const fs = require('fs');

const rootPath = appRootPath.path;
let config = {
    dest: path.join(rootPath, "module/fr-core/src/locale"),
    head: 2,
    langPath: [
        ///[\w-/\\+]module[\w-/\\]+src*/
        path.join(rootPath, 'module')
    ],
    frCorePath: path.join(rootPath, 'module', 'fr-core'),
    codeSrc: [

    ],
    iCodeSrc: [
        /[\w-/\\+]node_modules/,
        /[\w-/\\+]components[/\\](Slider|Table|Tree|TreeSelect|Upload|Trigger|TimePicker)[/\\]*/,
        /[\w-/\\+]components[/\\](Calendar|Form|FormValidating|SelectChange|Select)[/\\]*/
    ],
    xlsx: [
        path.join(rootPath, 'docs/languages/lang.xlsx')
    ],
    arraySeparator: ',',
    defaultColumn: 2,
    defaultColumn2: 0
};

let wrap = process.platform === "darwin" ? "\n": "\r\n";
let langData = {};

exportJson = () => {
    commentCode(config.xlsx.map(xlsxpath => xlsx.toJson(xlsxpath, config.dest, config)));
};

commentCode = data => {
    data.forEach(da => {
        for (let [key, value] of Object.entries(da)) {
            langData = Object.assign({}, langData, value['zh-cn']);
        }
    });

    config.langPath.forEach(dir => {
        getAllFiles(dir).forEach(ps => {
            try{
                commentFile(ps, fs.readFileSync(ps, 'utf-8'));
            } catch (e) {
                console.error("失败: " + ps, e);
            }
        });
    });
};

commentFile = (ps, data) => {
    let line = data.split(wrap), trans = false, i18n = false;
    let newLine = "", comment = 0;
    line.forEach((da, dx) => {
        if(dx !== 0) newLine += wrap;
        // if(da.indexOf('import i18n') !== -1 && da.indexOf('lib/i18n') !== -1) i18n = true;

        if(da.indexOf('/*') !== -1 && da.indexOf("*/") === -1){
            comment ++ ;
        } else if(da.indexOf("*/") !== -1 && da.indexOf('/*') === -1){
            comment -= (comment > 0? 1: 0);
        }
        let tranLine = commentLang(da, comment > 0);
        newLine += tranLine;
        if( !trans && tranLine !== da) trans = true;
    });

    //自动导入i18ncommentFile
    // if(trans && !i18n && ps.indexOf("Config.js") === -1){
    //     newLine = importI18n(ps) + newLine;
    // }
    writeNewFile(ps, newLine)
};

findComment = (line)=>{
    return line.indexOf("/*") !== -1;
};

findI18n = line => {
    let ix1 = line.indexOf("I18n.t(");
    return ix1 === -1? line.indexOf("i18n.t("): ix1;
};

commentLang = (line, comment) => {
    let n1 = findI18n(line),
        n11 = n1 + 7, // 7 = i18n.t(
        n2 = line.indexOf(")", n11);

    let nt1 = line.indexOf("/*", n11), nt2 = line.indexOf("*/", n11);
    if(nt1 !== -1 && nt2 !== -1 && n2 > nt1 && n2 < nt2){
        n2 = line.indexOf(")", nt2)
    }

    let nt3 = line.indexOf(",", nt2 > 0? nt2: n11);
    if(nt3 < n2 && nt3 !== -1){
        n2 = nt3;
    }

    if(n1 !== -1 && n2 !== -1){
        let s0 = line.substring(0, n11),
            s1 = line.substring(n11, n2),
            s2 = line.substring(n2);
        if (n2 !== 0 && findI18n(s2) !== -1){
            s2 = commentLang(s2, comment);
            line = s0 + s1 + s2;
        }
        comment  = comment || findComment(s0);
        let codes = s1.match(/\d+/g);
        if(codes){
            let k = codes[0], v = langData[k] || '';
            if(comment){
                line = `${s0}${k}*//*${v}*//*${s2}`;
            } else {
                line = `${s0}${k}/*${v}*/${s2}`;
            }
            !v && console.log("Not found: ", k, v);
        }
    }

    return line;
};

// 模块化工程需要修改
importI18n = (ps) => {
    if (ps.indexOf('fr-core') === -1){
        return `import {i18n} from 'fr-core'\n`;
    }
    let imp = "./", ix = ps.replace(path.join(config.frCorePath, 'src', path.sep), '').split("/").length - 1;
    for (let i = 0; i < ix; i++) {
        imp += "../";
    }
    return `import i18n from '${imp}extension/i18n';\n`;
};

writeNewFile = (ps, newLine) => {
    fs.writeFile(ps, newLine, error => {
        if( error) {
            console.log("write file error: " + error);
        }
    });
};

//获取需要的文件, 带过滤
getAllFiles = dir => {
    let filesArr = [];

    let read = (dirpath) => {
        //过滤
        if(config.codeSrc.some(da => !da.test(dirpath)) || config.iCodeSrc.some( da => da.test(dirpath))) return;
        fs.readdirSync(dirpath).forEach(item => {
            let filepath = path.join(dirpath, path.sep, item);
            let info = fs.statSync(filepath);
            if (info.isDirectory()) {
                read(filepath);
            } else if (/.(js|json)/.test(path.extname(item))) {
                filesArr.push(filepath);
            }
        });
    };
    read(dir);
    return filesArr;
};

exportJson();
