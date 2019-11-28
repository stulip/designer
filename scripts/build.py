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
# 默认debug模块
debug_module = "web"
# 编译脚本
build_web = utils.get_path("scripts/build.js")
zip_dir = os.path.join('dist', '.zip')
release_dist = os.path.join('build', 'dist')
dist_path = os.path.join("dist")


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
    parser.add_argument("-d", "--dev", dest="dev", action="store_true", default=0, help="编译DEV版本")
    parser.add_argument("-b", "--block", dest="block", action="store", default="dev",
                        help="模块配置名称(默认:base), 编译CORE的时候需要")
    parser.add_argument("-yu", "--yarn_upgrade", dest="yarn_upgrade", action="store_true",
                        help="运行 yarn upgrade")
    parser.add_argument("-f", "--force", dest="force", action="store_true", help="-g = true时强制更新代码")
    parser.add_argument("-rp", "--release_path", default=release_dist, action="store", help="编译Release版本时, 目标路径")

    (args, unkonw) = parser.parse_known_args(argv)
    args.module = len(unkonw) > 1 and unkonw[1] or (args.dev and debug_module or None)
    return args


def start(argv, args):
    if 'help' in args:
        return
    module = args.module
    config = utils.read_json(utils.get_path('config/config.json5'))
    if module is None or args.all or args.release:
        if args.release:
            os.path.isdir('dist') and shutil.rmtree('dist')
        for mo_name, mo_config in config['module'].items():
            if (args.all and mo_name in ignore_module['all']) or (
                args.release and mo_name in ignore_module['release']) or (
                module is None and not args.release and not args.all and mo_name in ignore_module['build']):
                print("\033[1;33m webpack:\033[0m 忽略模块 %s" % mo_name.upper())
                continue

            print("\033[0;34m webpack:\033[0m 编译模块 %s" % str(mo_name).upper())
            dev = args.dev and 'true' or 'false'
            commend = 'node %s --module %s --progress false --block %s --release %s --dev %s' % (
            build_web, mo_name, args.block, args.release, dev)
            thread_start(build_js, (mo_name, commend,))
        thread_sleep()
        for name in error_module:
            print("\033[1;31m webpack: 编译模块 %s 失败! \033[0m" % str(name).upper())
        if args.release and len(error_module) == 0:
            merge_assets(args, config)
            print("\033[0;34m webpack:\033[0m 发布完成!")
        else:
            print("\033[0;34m webpack:\033[0m 编译完成!")
    else:
        build_module(args, module)


# 合并资源到index.js中
def merge_assets(args, config):
    os.path.isdir(zip_dir) and shutil.rmtree(zip_dir)
    shutil.copytree(dist_path, zip_dir)

    merge_file(args, 'css', config)
    merge_file(args, 'js', config)

    not os.path.isdir('build') and os.mkdir('build')
    utils.zip_dir(zip_dir, 'build/dist-release.zip')

    copy_release(args.release_path)
    # 删除 zip 目录
    shutil.rmtree(zip_dir)

# 复制dist到release目录
def copy_release (dist):
    if os.path.isdir(dist):
        if os.path.isfile(os.path.join(dist, 'index.html')):
            shutil.rmtree(dist)
        else:
            raise Exception("此目录非项目工作目录!")

    shutil.copytree(zip_dir, dist)

def merge_file(args, six, config):
    block = config['block'][args.block]
    list_dirs = utils.get_path(dist_path)
    index_name = 'index.%s' % six

    module_list = ["web"]
    for key, value in block.items():
        module_list.append(key)

    value = ''
    for module in module_list:
        path = os.path.join(list_dirs, module, six, index_name)
        fp = open(path, 'r', encoding='utf-8')
        try:
            value += fp.read() + '\n'
            os.remove(path.replace(dist_path, zip_dir))
        except Exception as e:
            raise Exception("合并资源错误:", e)
        finally:
            fp.close()

    o_path = os.path.join(utils.get_path(zip_dir), 'web', six, index_name)
    os.path.isfile(o_path) and os.remove(o_path)
    out = open(o_path, "w", encoding='utf-8')
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
    dev = args.dev and 'true' or 'false'
    commend = 'node %s --module %s --progress %s --block %s --dev %s' % (
    build_web, module, progress, args.block, dev)
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
