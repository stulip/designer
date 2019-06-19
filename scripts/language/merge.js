let path = require("path");
let fs = require('fs');
let langData = require('../src/locale/zh-cn');

let config = {
    dest: './../src/locale/',
    head: 2,
    codeSrc: [
        // './../src/components/',
        './../src/',
        // './../src/layouts/',
    ],
    iCodeSrc: [
        path.normalize(`${__dirname}/../src/components/Calendar/`),
        path.normalize(`${__dirname}/../src/components/Form/`),
        path.normalize(`${__dirname}/../src/components/FormValidating/`),
        path.normalize(`${__dirname}/../src/components/SelectChange/`),
        path.normalize(`${__dirname}/../src/components/Select/`),
        path.normalize(`${__dirname}/../src/components/Slider/`),
        path.normalize(`${__dirname}/../src/components/Table/`),
        path.normalize(`${__dirname}/../src/components/Tree/`),
        path.normalize(`${__dirname}/../src/components/TreeSelect/`),
        path.normalize(`${__dirname}/../src/components/Upload/`),
        path.normalize(`${__dirname}/../src/components/Trigger/`),
        path.normalize(`${__dirname}/../src/components/Tree/`),
        path.normalize(`${__dirname}/../src/components/TimePicker/`)
    ],
    src: [
        "./../Doc/languages/lang.xlsx"
    ],
    arraySeparator: ',',
};
let wrap = process.platform === "darwin" ? "\n": "\r\n";
let mergeData = {};

commentCode = () => {

    let keys = Object.keys(langData), values = Object.values(langData);
    let jx = keys.length;
    for (let index = 0; index < jx; index++){
        let k = keys[index], v = values[index];
        for (let i = index; i < jx; i ++) {
            let mk = keys[i], mv = values[i];
            if(mk !== k && v === mv){
                // console.log(k, mk, mv)
                mergeData[mk] = k;
            }
        }
    }
    let newLangData = {}, str = "", str2 = "";
    let mergeKey = Object.keys(mergeData);
    entries = Object.entries(langData);
    for (let [k, v] of entries){
        if(mergeKey.indexOf(k) === -1){
            newLangData[k] = v;
            str += (k + wrap);
            str2 += (v + wrap);
        }
    }

    // let me_path = path.join(__dirname, "/../Doc/languages");
    // let dest_file = path.resolve(me_path, "key" + ".txt");
    // fs.writeFile(dest_file, str, function (err) {
    //     if (err) {
    //         console.log("error：", err);
    //         throw err;
    //     }
    // });
    // dest_file = path.resolve(me_path, "value" + ".txt");
    // fs.writeFile(dest_file, str2, function (err) {
    //     if (err) {
    //         console.log("error：", err);
    //         throw err;
    //     }
    // });
    // dest_file = path.resolve(me_path, "merge" + ".txt");
    // fs.writeFile(dest_file, JSON.stringify(mergeData, null, 2), function (err) {
    //     if (err) {
    //         console.log("error：", err);
    //         throw err;
    //     }
    // });

    console.log("重复数据: ", Object.keys(mergeData).length);
    console.log("去重后: ", Object.keys(newLangData).length);

    config.codeSrc.forEach(of => {
        let allFiles = getAllFiles(path.join(__dirname, of, "/"));
        allFiles.forEach(ps => {
            fs.readFile(ps, 'UTF-8', (error, data) => {
                if (!error) {
                    commentFile(ps, data);
                } else {
                    console.log("失败: " + ps, error)
                }
            });
        });
    });
};

commentFile = (ps, data) => {
    let line = data.split(wrap);
    let newLine = "", comment = 0;
    line.forEach((da, dx) => {
        if(dx !== 0) newLine += wrap;
        if(da.indexOf('/*') !== -1 && da.indexOf("*/") === -1){
            comment ++ ;
        } else if(da.indexOf("*/") !== -1 && da.indexOf('/*') === -1){
            comment -= (comment > 0? 1: 0);
        }
        newLine += commentLang(da, comment > 0);
    });
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
            let k = codes[0],
                v = langData[k] || '',
                mk = mergeData[k] || k;
            if(comment){
                line = `${s0}${mk}*//*${v}*//*${s2}`;
            } else {
                line = `${s0}${mk}/*${v}*/${s2}`;
            }
            !v && console.log(k, v);
        }

        // let entries = Object.entries(langData);
        // for (let [k, v] of entries){
        //     if(String(s1).indexOf(k) !== -1){
        //         let mk = mergeData[k] || k;
        //         if(comment){
        //             line = `${s0}${mk}*//*${v}*//*${s2}`;
        //         } else {
        //             line = `${s0}${mk}/*${v}*/${s2}`;
        //         }
        //         break;
        //     }
        //
        // }

    }

    return line;
};

writeNewFile = (ps, newLine) => {
    fs.writeFile(ps, newLine, error => {
        if( error) {
            console.log("write file error: " + error);
        }
    });
};

getAllFiles = dir => {
    let filesArr = [];

    let read = (dirpath) => {
        if(config.iCodeSrc.indexOf(dirpath) !== -1) return;
        fs.readdirSync(dirpath).forEach(item => {
            let info = fs.statSync(dirpath + item);
            if (info.isDirectory()) {
                read(dirpath + item + '/');
            } else if (item.indexOf(".js") !== -1 && item.indexOf(".json") === -1) {
                filesArr.push(dirpath + item);
            }
        });
    };
    read(dir);
    return filesArr;
};

commentCode();