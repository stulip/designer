#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# author tangzehua
# version v1.0.0

import os
import zipfile
import sys
from plugins import json5


# 获取具体路径，拼接根路径
def get_path(path):
    return os.path.normpath(os.path.join(sys.path[0], '..', path))


# 读取git modules文件
def read_git_modules(path):
    fp = open(path, 'r', encoding='utf-8')
    try:
        line_ary = fp.read().split("\n")
    except Exception as e:
        raise Exception("读取子模块错误:", e)
    finally:
        fp.close()

    data = {}
    item = {}
    for line in line_ary:
        if line.find('[') != -1:
            item = {}
            data[line[line.find("\"") + 1: line.rfind("\"")]] = item
        elif line.find("=") != -1:
            r_line = line.strip()
            item[r_line[: r_line.find(" ")]] = r_line[r_line.find("=") + 1:].strip()
    return data


# 读取JSON文件
def read_json(path):
    with open(path, 'r', encoding='utf-8') as text:
        data = json5.load(text)
    return data


# 删除目录下面的所有文件跟目录不包括自己
def remove_dirs(path):
    for root, dirs, files in os.walk(path):
        for f in files:
            os.remove(os.path.join(root, f))
        for d in dirs:
            remove_dirs(os.path.join(root, d))
            os.rmdir(os.path.join(root, d))


# 压缩zip目录
def zip_dir(dirname, filename):
    filelist = []
    if os.path.isfile(dirname):
        filelist.append(dirname)
    else :
        for root, dirs, files in os.walk(dirname):
            for dir in dirs:
                filelist.append(os.path.join(root,dir))
            for name in files:
                filelist.append(os.path.join(root, name))

    zf = zipfile.ZipFile(filename, "w", zipfile.zlib.DEFLATED)
    for tar in filelist:
        arcname = tar[len(dirname):]
        #print arcname
        zf.write(tar,arcname)
    zf.close()
