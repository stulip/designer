#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# author tangzehua
# version v1.0.0


import sys
import utils
import subprocess
import time
import os
import shutil
import _thread as thread
import git_sub_module

thread_copy_res_num = 0
error_module = []
# 忽略模块
ignore_module = {
    "build": ['test', 'web'],
    "all": ['test'],
    "release": ['test'],
}
# 编译脚本
build_web = utils.get_path("scripts/build.js")


class struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)


def parse_args(argv):
    from argparse import ArgumentParser

    parser = ArgumentParser(description="编译模块代码, 包含git代码拉取和node包安装")
    parser.add_argument("-g", "--git", dest="git", action="store_true", help="拉取代码")
    parser.add_argument("-r", "--release", dest="release", action="store_true", help="编译正式版(ZIP)",
                        default=0)
    parser.add_argument("-a", "--all", dest="all", action="store_true", help="编译所有模块")
    parser.add_argument("-b", "--block", dest="block", action="store", default="base",
                        help="模块配置名称(默认:base), 编译CORE的时候需要")
    parser.add_argument("-yu", "--yarn_upgrade", dest="yarn_upgrade", action="store_true",
                        help="运行 yarn upgrade")
    parser.add_argument("-f", "--force", dest="force", action="store_true", help="-g = true时强制更新代码")

    (args, unkonw) = parser.parse_known_args(argv)
    return args


def start(argv, args):
    if 'help' in args:
        return
    module = None
    if len(argv) > 1:
        module = argv[1]

    # print(args.release)
    config = utils.read_json(utils.get_path('config/config.json5'))
    if module is None or args.all or args.release:
        if args.release:
            os.path.isdir('dist') and shutil.rmtree('dist')
        for mo_name, mo_config in config['module'].items():
            if (args.all and mo_name in ignore_module['all']) or (
                args.release and mo_name in ignore_module['release']) or (
                module is None and mo_name in ignore_module['build']):
                print("\033[1;33m⬡ webpack:\033[0m 忽略模块 %s" % mo_name.upper())
                continue

            print("\033[0;34m⬡ webpack:\033[0m 编译模块 %s" % str(mo_name).upper())
            commend = 'node %s --module %s --progress false --block %s --release %s' % (
            build_web, mo_name, args.block, args.release)
            thread_start(build_js, (mo_name, commend,))
        thread_sleep()
        for name in error_module:
            print("\033[1;31m⬢ webpack: 编译模块 %s 失败! \033[0m" % str(name).upper())
        if args.release and len(error_module) == 0:
            merge_assets(args)
            print("\033[0;34m⬡ webpack:\033[0m 发布完成!")
        else:
            print("\033[0;34m⬡ webpack:\033[0m 编译完成!")
    else:
        build_module(args, module)


# 合并资源到index.js中
def merge_assets(args):
    os.path.isdir('.dist') and shutil.rmtree('.dist')
    shutil.copytree('dist', '.dist')

    merge_file(args, 'css')
    merge_file(args, 'js')

    not os.path.isdir('build') and os.mkdir('build')
    utils.zip_dir('.dist', 'build/dist-release.zip')
    # shutil.rmtree('.dist')


def merge_file(args, six):
    value = ''
    list_dirs = utils.get_path("dist")
    index_name = 'index.%s' % six

    for root, dirs, files in os.walk(list_dirs):
        for f in files:
            path = os.path.join(root, f)
            if f == index_name:
                fp = open(path)
                try:
                    fp_value = fp.read() + "\n"
                    if path.find('web' + os.path.sep) != -1:
                        value = fp_value + value
                    else:
                        value += fp_value
                    os.remove(path.replace("dist", '.dist'))
                except Exception as e:
                    raise Exception("合并资源错误:", e)
                finally:
                    fp.close()

    o_path = os.path.join(utils.get_path(".dist"), 'web', six, index_name)
    os.path.isfile(o_path) and os.remove(o_path)
    out = open(o_path, "w")
    out.write(value)
    out.close()


# 编译对应模块
def build_module(args, module):
    if args.git:
        sub_args = {"force": args.force, "module": module, "block": args.block}
        git_sub_module.start(struct(**sub_args))
        stat = subprocess.call('yarn %s' % (args.yarn_upgrade and 'upgrade' or ''), shell=True)
        if stat != 0:
            raise Exception("安装模块 %s 依赖失败!" % module.upper())
    progress = args.git and 'false' or 'true'
    commend = 'node %s --module %s --progress %s --block %s' % (
    build_web, module, progress, args.block)
    stat = subprocess.call(commend, shell=True)
    if stat != 0:
        raise Exception("编译模块 %s 失败!" % module.upper())


def thread_start(method, args):
    global thread_copy_res_num
    thread_copy_res_num += 1
    thread.start_new_thread(method, args)


def thread_sleep():
    while True:
        if thread_copy_res_num <= 0:
            return
        time.sleep(0.2)


def build_js(mo_name, command):
    global thread_copy_res_num
    global error_module
    ret_code = subprocess.call(command, shell=True)
    if ret_code != 0:
        error_module.append(mo_name)
    thread_copy_res_num -= 1
    thread.exit_thread()


if __name__ == '__main__':
    start(sys.argv, parse_args(sys.argv))
