/**
 * 程序更新脚本
 * @tangzehua
 * @since 2018-04-13 12:33
 * @version v1.0.0.alpha.3
 */
const appRootPath = require("app-root-path");
const path = require("path");
const fs = require('fs');

const rootPath = appRootPath.path;
const config = {
    //需要替换的目录
    codeSrc: [
        path.join(rootPath, 'module')
    ],
    //忽略目录
    ignoreDir: [
        /node_modules/
    ]
};

//普通替换
const rpNMap = {
    "NULL": "NULL",//防止空对象
    // "API_FOODING_ES": "Api.ES",
    // "API_FOODING_DS": "Api.DS",
    // "API_FOODING_ERP": "Api.ERP",
    // "API_FOODING_OA": "Api.OA",
    // "API_NOOHLE_OA": "Api.NOA",
    // "API_FOODING_MESSAGE": "Api.MESSAGE",
    // "API_FOODING_WORK": "Api.WORK",
    // "API_FOODING_MAIL_SERVER": "Api.MAIL_SERVER",
    // "API_FOODING_MassMailServer": "Api.MASS_MAIL_SERVER",
    // "API_FOODING_MAIL": "Api.MAIL",
    // "API_FOODING_HR": "Api.HR",
    // "API_NOOHLE_TOOL": "Api.TOOL",
    //
    // "apiForm(": "Api.form(",
    // "apiForm,": "Api.form,",
    // "apiForm}": "Api.form}",
    // "apiGet(": "Api.get(",
    // "apiGet,": "Api.get,",
    // "apiGet}": "Api.get}",
    // "apiPost(": "Api.post(",
    // "apiPost,": "Api.post,",
    // "apiPost;": "Api.post;",
    // "apiPost}": "Api.post}",
    // "+language,": "+ Api.language,",
    // "+language]": "+ Api.language]",
    // "+ language,": "+ Api.language,",
    // "+ language]": "+ Api.language]",
    //
    // "I18n.": "i18n.",
    "ServiceTips": "Comps.Tips",
    "<ConstVirtualSelect": "<Select.Virtual",
    "<ConstMiniSelect": "<Select.Mini",
    "<Option": "<Select.Option",
    "</Option>": "</Select.Option>",
    " Confirm(": " Dialog.Confirm(",
    " createForm(": " Comps.Form.createForm(",
    "=createForm(": "=Comps.Form.createForm(",
    "<FormWrapper": "<Comps.Form.FormWrapper",
    "</FormWrapper>": "</Comps.Form.FormWrapper>",
    "WebData.": "xt.data.",
    "<Radio": "<Comps.Radio",
    "</Radio>": "</Comps.Radio>",
    "<DataTime": "<Comps.DataTime",
    "</DataTime>": "</Comps.DataTime>",
    "<Calendar": "<Comps.DataTime",
    "</Calendar>": "</Comps.DataTime>",
    "fieldsFormat.": "xt.fieldsFormat.",
};

//正则
let RegConfig = {
    normal: null, //运行时生成
    //引入替换
    imp: {
        "NULL": "NULL",//防止空对象
        // "{i18n}": new RegExp("(i18n)", 'g'),
        // "Api": new RegExp("(API_FOODING_ES|API_FOODING_DS|API_FOODING_ERP|API_FOODING_OA|API_NOOHLE_OA" +
        //     "|API_FOODING_MESSAGE|apiForm|apiGet|apiPost|API_FOODING_HR|API_NOOHLE_TOOL|language|" +
        //     "API_FOODING_WORK|API_FOODING_MAIL_SERVER|API_FOODING_MassMailServer|API_FOODING_MAIL)", "g"),
    },
    impForm: [
        {
            from: 'fr-core',
            comps: {
                "i18n": "import[\\s]+i18n",
                "Api": "import[\\s\\w\\{]+Api",
                "xt": "import[\\s]+(xt|WebData|fieldsFormat)",
                "moment": "import[\\s]+moment",
                "Comps": "import[\\s\\{\\}]+(Dialog|Table|TimePicker|ServiceTips|Radio|Confirm|createForm|ServiceTips|DataTime|Calendar)[,\\s\\{\\}\\w/\\.'\"]*(components)[/'\"]+"
            }
        },
        {
            from: 'fr-ui',
            comps: {
                "Select": "import[\\s\\{\\}]+(Select|ConstMiniSelect|Option|ConstVirtualSelect)[,\\s\\{\\}+]",
                "AddSelect": "import[\\s]+AddSelect",
                "AddCompetitor": "import[\\s]+AddCompetitor",
                "AddMoreLanguage": "import[\\s]+AddMoreLanguage",
                "Download": "import[\\s]+Download",
                "InputBoxCheck": "import[\\s]+InputBoxCheck",
                "button": "import[\\s]+button",
                "RuleTemplate": "import[\\s]+RuleTemplate",
                "SchduleDragView": "import[\\s]+SchduleDragView",
                "SelectChange": "import[\\s]+SelectChange",
                "Page": "import[\\s]+Page",
                "TabSwitch": "import[\\s]+TabSwitch",
                "SystemRuleTem": "import[\\s]+SystemRuleTem",
                "FindGridSelect": "import[\\s]+FindGridSelect",
                "NameCheck": "import[\\s]+NameCheck",
                "FormValidatin": "import[\\s]+FormValidatin",
            }
        },
    ],
    //删除不需要的引入
    delImp: "import[\\s]+(NavConnect)",
    //重复引入
    repeatImp: "import[\\s]+(i18n)",
};

/**
 * 初始化正则
 */
function initReg() {
    let rpReg = "";
    Object.keys(rpNMap).forEach((key, ix) => {
        rpReg += (!!ix ? "|" : '') + key.replace(/(\(|\)|\.|\+)/g, $1 => "\\" + $1);
    });
    RegConfig.normal = RegExp(`(${rpReg})`, "g");
}

/**
 * 执行替换制定文件夹
 * @param {string} of 文件夹路径
 */
commentCode = of => {
    let dt = Date.now();
    let index = 0, allFiles = getAllFiles(of + path.sep);
    let suc = () => allFiles.length === (++index) && console.log("END:", of, (Date.now() - dt) / 1000.0);

    allFiles.forEach(async ps => {
        try {
            commentFile(ps, fs.readFileSync(ps, 'UTF-8'));
        } catch (e) {
            console.log("失败: " + ps, e)
        } finally {
            suc();
        }
    });
};

/**
 * 替换单个文件数据
 * @param {string} ps 文件路径
 * @param {string} data 文件数据
 */
commentFile = (ps, data) => {
    let line = data.split("\n"), comLine = null, newLine = "", repeatSet = new Set();
    line.forEach((da, dx) => {
        let singleLine = "";
        if (dx !== 0) singleLine += "\n";

        comLine = comLine ? comLine + da : da;

        //先处理import, 考虑换行模式下的代码
        //!/\/\//.test(comLine) &&
        if (!/import\s("|')/.test(comLine) && /import\s/g.test(comLine)) {
            if (/from/g.test(comLine)) singleLine += replaceImp(comLine, newLine);
            else return;//console.log("T:", da);
        }
        else singleLine += da.replace(new RegExp(RegConfig.normal, "g"), $1 => rpNMap[$1]);

        if (RegExp(RegConfig.repeatImp).test(singleLine)) {
            //处理重复引入
            !repeatSet.has(RegExp.$1) && (newLine += singleLine) && repeatSet.add(RegExp.$1)
        } else {
            if (singleLine !== '') newLine += singleLine;
        }
        comLine = null;
    });
    newLine !== data && writeNewFile(ps, newLine);
};

/**
 * import 导入部分的替换
 * @param {string} da 需要替换的字符串
 * @param {string} newLine 新的数据,已处理的行数据
 * @returns {string}
 */
function replaceImp(da, newLine) {
    let impAry = da.split("from");
    if(RegExp(RegConfig.delImp).test(da)) return '';
    
    for (let [key, value] of Object.entries(RegConfig.imp)) {
        impAry[0] = impAry[0]
            .replace(value, () => key).replace(new RegExp('\\s+', 'g'), ' ')
            .replace(new RegExp(`,[\\s]*(${key})(?=.*\\1)`, 'g'), '')
            .replace(new RegExp(`(${key}),[\\s]*(?=.*\\1)`, 'g'), '')
    }
//    impAry.join("from") !== da && console.log(da, impAry.join("from"));
    let line = impAry.join("from");
    RegConfig.impForm.forEach(imp => {
        for (let [key, value] of Object.entries(imp.comps)) {
            if (!RegExp(`["']+${imp.from}["']+`).test(line) && RegExp(value).test(line)){
                if (!RegExp(`import[\\s]+[\\{\\}]*(${key})[,\\s\\{\\}+]`).test(newLine)){
                    line = `import {${key}} from '${imp.from}'`
                } else {
                    line = '';
                }
                break
            }
        } 
    });
    return line;
}

/**
 * 写入文件
 * @param {string} ps
 * @param {string} newLine
 */
writeNewFile = async (ps, newLine) => {
    try {
        fs.writeFileSync(ps, newLine);
    } catch (e) {
        console.log("write file error: " + e);
    }
};

/**
 * 获取制定路径的所有文件
 * @param {string} dir 文件夹路径
 * @returns {Array}
 */
getAllFiles = dir => {
    let filesArr = [];
    let read = dirPath => {
        if (config.ignoreDir.some(da => da.test(dirPath))) {
            console.log("忽略:", dirPath);
            return;
        }
        fs.readdirSync(dirPath).forEach(item => {
            let info = fs.statSync(dirPath + item);
            if (info.isDirectory()) {
                read(path.join(dirPath, item, path.sep));
            } else if (/.js$/.test(item)) {
                filesArr.push(dirPath + item);
            }
        });
    };
    read(dir);
    return filesArr;
};

/**
 * 程序执行入口
 */
function main() {
    initReg();
    config.codeSrc.forEach(commentCode);
}

main();
