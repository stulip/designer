let xlsx = require('node-xlsx');
let fs = require('fs');
let path = require('path');
let moment = require('../../../node_modules/moment');

let config;

module.exports = {

    /**
     * export .xlsx file to json
     * src_excel_file: path of .xlsx files.
     * dest_dir: directory for exported json files.
     * head: line number of excell headline.
     * separator : array separator.
     */
    toJson: function (src_excel_file, dest_dir, conf) {
        let {head} = conf;
        config = conf;

        if (!fs.existsSync(dest_dir)) {
            fs.mkdirSync(dest_dir);
        }
        console.log("parsing excel:", src_excel_file);
        let excel = xlsx.parse(src_excel_file);
        return _toJson(excel, dest_dir, head);
    }
};

/**
 * export .xlsx file to json formate.
 * excel: json string converted by 'node-xlsx'。
 * head : line number of excell headline.
 * dest : directory for exported json files.
 */
function _toJson(excel, dest, head) {
    let jsonData = {};
    for (let i_sheet = 0; i_sheet < excel.worksheets.length; i_sheet++) {
        let sheet = excel.worksheets[i_sheet];
        console.log("name:" + sheet.name + " cols:" + sheet.maxCol, "rows:" + sheet.maxRow);

        // process the sheet without external keys only, or start with a '#'
        if (sheet.name.indexOf('@') == -1 && sheet.name[0] !== "#") {
            let output = _parseSheet(sheet, head);

            // scan rest sheets for external keys
            for (let j = i_sheet; j < excel.worksheets.length; j++) {
                let rest_sheet = excel.worksheets[j];
                let rest_sheet_name = rest_sheet.name;
                if ((rest_sheet_name + '').indexOf('@') != -1) {
                    let temp = rest_sheet_name.split('@');
                    let external_key = temp[0];
                    let sheet_name = temp[1];
                    let external_values = _parseSheet(rest_sheet, head);
                    if (sheet.name === sheet_name) {
                        console.log("find external_key:" + external_key, "in sheet:" + sheet_name);
                        for (let k in output) {
                            //console.log("k:" + k, "output[k]:" + output[k]);
                            if (output[k] && external_values[k]) {
                                output[k][external_key] = external_values[k];
                            }
                        }
                    }
                }
            }

            let data = JSON.stringify(output, null, 2);

            let dest_file = path.resolve(dest, sheet.name + ".json");
            fs.writeFile(dest_file, data, function (err) {
                if (err) {
                    console.log("error：", err);
                    throw err;
                }
                console.log('exported successfully  -->  ', path.basename(dest_file));
            });
            jsonData[sheet.name] = output;
        } else if (sheet.name[0] === "#" && sheet.name[sheet.name.length - 1] === '#') {
            let output = _parseSheet(sheet, head);

            // scan rest sheets for external keys
            for (let j = i_sheet; j < excel.worksheets.length; j++) {
                let rest_sheet = excel.worksheets[j];
                let rest_sheet_name = rest_sheet.name;
                if ((rest_sheet_name + '').indexOf('@') != -1) {
                    let temp = rest_sheet_name.split('@');
                    let external_key = temp[0];
                    let sheet_name = temp[1];
                    if (sheet.name === sheet_name) {
                        let external_values = _parseSheet(rest_sheet, head);
                        // console.log("find external_key:" + external_key, "in sheet:" + sheet_name);
                        output = Object.assign({}, output, external_values);
                    }
                }
            }
            let outAll = {};
            for (let key in output) {
                let obj = output[key];
                let dataKeys = Object.keys(obj);
                for (let i = 0, j = dataKeys.length; i < j; i++) {
                    let file = dataKeys[i];
                    let fileObj = outAll[file] || {};
                    fileObj[key] = obj[file] || obj[dataKeys[config.defaultColumn]] || obj[dataKeys[config.defaultColumn2]] || '';
                    outAll[file] = fileObj;
                }
            }
            for (let ofo in outAll) {
                let data = outAll[ofo];
                let str = "module.exports = " + JSON.stringify(data, null, 2) + ";";

                let dest_file = path.resolve(dest, ofo + ".js");
                fs.writeFile(dest_file, str, function (err) {
                    if (err) {
                        console.log("error：", err);
                        throw err;
                    }
                    console.log('exported successfully  -->  ', path.basename(dest_file));
                });
            }
            jsonData[sheet.name] = outAll;
        }
    }
    return jsonData;
}

/**
 * util method for detect object is an array
 * @param o
 * @returns {boolean}
 */
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

let OUTPUT_ARRAY = 0;
let OUTPUT_OBJ_VALUE = 1;
let OUTPUT_OBJ_ARRAY = 2;

/**
 * parse one sheet and return the result as a json object or array
 *
 * @param sheet
 * @param head
 * @returns {*}
 * @private
 */
function _parseSheet(sheet, head) {

    if (sheet.data && sheet.data.length > 0) {

        let row_head = sheet.data[head - 1];

        let col_type = []; //column data type
        let col_name = []; //column name
        let objOutput = OUTPUT_ARRAY;

        //读取表头 解读列名字和列数据类型
        //parse headline to get column name & column data type
        for (let i_cell = 0; i_cell < row_head.length; i_cell++) {
            let name = row_head[i_cell].value;
            // console.log("xxxx:", i_cell, row_head[i_cell].value);
            if (typeof name == 'undefined' || !name) {
                break;
            }

            let type = 'basic';

            if ((name + '').indexOf('#') != -1) {
                let temp = name.split('#');
                name = temp[0];
                type = temp[1];
                if (type) {
                    type = trim(type);
                    // if there exists an id type, change the whole output to a json object
                    if (type === 'id') {
                        objOutput = OUTPUT_OBJ_VALUE;
                    } else if (type === 'id[]') {
                        objOutput = OUTPUT_OBJ_ARRAY;
                    }
                }
            }

            col_type.push(type);
            col_name.push(name);
        }

        let output = objOutput ? {} : [];

        for (let i_row = head; i_row < sheet.maxRow; i_row++) {
            let row = sheet.data[i_row];
            //if (typeof row == 'undefined' || !row[0]) {
            if (typeof row == 'undefined') {
                console.log("在导出到第" + i_row + "行时候出错！", sheet.data[head]);
                break;
            }
            let json_obj = {};
            let id;

            for (let i_col = 0; i_col < col_type.length; i_col++) {
                let cell = row[i_col];
                let type = col_type[i_col].toLowerCase().trim();
                //console.log(col_name[i_col],cell.value,typeof(cell),type);

                // if the cell is empty, do not export the key
                switch (type) {
                    case 'id': // id
                        if (cell) {
                            id = cell.value;
                            !id && console.log("空行:", i_row, cell)
                        }
                        break;
                    case 'id[]': // id[]
                        if (cell) {
                            id = cell.value;
                            if (!output[id]) {
                                output[id] = [];
                            }
                        }
                        break;
                    case 'basic': // number string boolean date
                        if (cell) {
                            if (isDateType(cell.value)) {
                                parseDateType(json_obj, col_name[i_col], cell.value);
                            } else {
                                json_obj[col_name[i_col]] = cell.value;
                            }
                        }
                        break;
                    case 'date':
                        parseDateType(json_obj, col_name[i_col], cell.value);
                        break;
                    case 'string':
                        if (cell) {
                            // if (isDateType(cell.value)) {
                            //     parseDateType(json_obj, col_name[i_col], cell.value);
                            // } else {
                                if (cell.value === null || cell.value.toString() === 'null' || cell.value.toString() === 'NaN') {
                                    json_obj[col_name[i_col]] = "";
                                } else {
                                    json_obj[col_name[i_col]] = cell.value.toString();
                                }
                            // }
                        } else {
                            json_obj[col_name[i_col]] = "";
                        }
                        break;
                    case 'number':
                        //+xxx.toString() '+' means convert it to number
                        let isNumber = !isNaN(+cell.value.toString());
                        if (cell && isNumber) {
                            json_obj[col_name[i_col]] = Number(cell.value);
                        } else {
                            json_obj[col_name[i_col]] = 0;
                        }
                        if (!isNumber) {
                            console.log("cell[" + (i_row + 1) + "," + (i_col + 1) + "]: not a number");
                        }
                        break;
                    case 'bool':
                        if (cell) {
                            json_obj[col_name[i_col]] = toBoolean(cell.value.toString());
                        } else {
                            json_obj[col_name[i_col]] = false;
                        }
                        break;
                    case '{}': //support {number boolean string date} property type
                        if (cell && cell.value && cell.value.trim().length) {
                            parseObject(json_obj, col_name[i_col], cell.value);
                        }
                        break;
                    case '[]': //[number] [boolean] [string]
                        if (cell) {
                            parseBasicArrayField(json_obj, col_name[i_col], cell.value);
                        }
                        break;
                    case '[{}]':
                        if (cell && cell.value && cell.value.trim().length) {
                            parseObjectArrayField(json_obj, col_name[i_col], cell.value);
                        } else {
                            json_obj[col_name[i_col]] = [];
                        }
                        break;
                    case 'string_value':
                        if (cell) {
                            if (cell.value === null || cell.value.toString() === 'null') {
                                json_obj = "";
                            } else {
                                json_obj = cell.value.toString();
                            }
                        } else {
                            json_obj = "";
                        }
                        break;
                    case 'sheet':
                        // console.log("sheet");
                        break;
                    default:
                        console.log('********************************************');
                        console.log('unrecognized type', cell.value, typeof (cell.value));
                        break;
                }

                //console.log('********************************************');
                //console.log("--->",i_row,type,json_obj[col_name[i_col]], col_name[i_col],cell);

            }
            if (objOutput === OUTPUT_OBJ_VALUE) {
                output[id] = json_obj;
            } else if (objOutput === OUTPUT_OBJ_ARRAY) {
                output[id].push(json_obj);
            } else if (objOutput === OUTPUT_ARRAY) {
                output.push(json_obj);
            }
        }
        //console.log("output******",output);
        return output;
    }
}

/**
 * parse date type
 * row:row of xlsx
 * key:col of the row
 * value: cell value
 */
function parseDateType(row, key, value) {
    row[key] = convert2Date(value);
    //console.log(value,key,row[key]);
}

/**
 * convert string to date type
 * value: cell value
 */
function convert2Date(value) {
    let dateTime = moment(value);
    if (dateTime.isValid()) {
        return dateTime.format("YYYY-MM-DD HH:mm:ss");
    } else {
        return "";
    }
}

/**
 * parse object array.
 */
function parseObjectArrayField(row, key, value) {

    let obj_array = [];

    if (value) {
        if (value.indexOf(',') !== -1) {
            obj_array = value.split(',');
        } else {
            obj_array.push(value.toString());
        }
    }

    // if (typeof(value) === 'string' && value.indexOf(',') !== -1) {
    //     obj_array = value.split(',');
    // } else {
    //     obj_array.push(value.toString());
    // };

    let result = [];

    obj_array.forEach(function (e) {
        if (e) {
            result.push(array2object(e.split(';')));
        }
    });

    row[key] = result;
}

/**
 * parse object from array.
 *  for example : [a:123,b:45] => {'a':123,'b':45}
 */
function array2object(array) {
    let result = {};
    array.forEach(function (e) {
        if (e) {
            let kv = e.trim().split(':');
            if (isNumber(kv[1])) {
                kv[1] = Number(kv[1]);
            } else if (isBoolean(kv[1])) {
                kv[1] = toBoolean(kv[1]);
            } else if (isDateType(kv[1])) {
                kv[1] = convert2Date(kv[1]);
            }
            result[kv[0]] = kv[1];
        }
    });
    return result;
}

/**
 * parse object
 */
function parseObject(field, key, data) {
    field[key] = array2object(data.split(';'));
}

/**
 * parse simple array.
 */
function parseBasicArrayField(field, key, array) {
    let basic_array;

    if (typeof array === "string") {
        basic_array = array.split(config.arraySeparator);
    } else {
        basic_array = [];
        basic_array.push(array);
    }

    let result = [];
    if (isNumberArray(basic_array)) {
        basic_array.forEach(function (element) {
            result.push(Number(element));
        });
    } else if (isBooleanArray(basic_array)) {
        basic_array.forEach(function (element) {
            result.push(toBoolean(element));
        });
    } else { //string array
        result = basic_array;
    }
    // console.log("basic_array", result + "|||" + cell.value);
    field[key] = result;
}

/**
 * convert value to boolean.
 */
function toBoolean(value) {
    return value.toString().toLowerCase() === 'true';
}

/**
 * is a boolean array.
 */
function isBooleanArray(arr) {
    return arr.every(function (element, index, array) {
        return isBoolean(element);
    });
}

/**
 * is a number array.
 */
function isNumberArray(arr) {
    return arr.every(function (element, index, array) {
        return isNumber(element);
    });
}

/**
 * is a number.
 */
function isNumber(value) {

    if (typeof (value) == "undefined") {
        return false;
    }

    if (typeof value === 'number') {
        return true;
    }
    return !isNaN(+value.toString());
}

/**
 * boolean type check.
 */
function isBoolean(value) {

    if (typeof (value) == "undefined") {
        return false;
    }

    if (typeof value === 'boolean') {
        return true;
    }

    let b = value.toString().trim().toLowerCase();

    return b === 'true' || b === 'false';
}

//delete all space
function trim(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
}

/**
 * date type check.
 */
function isDateType(value) {
    if (value) {
        let str = value.toString();
        return moment(new Date(value), "YYYY-M-D", true).isValid() || moment(value, "YYYY-M-D H:m:s", true).isValid() || moment(value, "YYYY/M/D H:m:s", true).isValid() || moment(value, "YYYY/M/D", true).isValid();
    }
    return false;
}
