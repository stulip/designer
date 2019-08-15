#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# author tangzehua
# version v1.0.0

import os
import subprocess
import sys
import utils


def parse_args(argv):
    from argparse import ArgumentParser

    parser = ArgumentParser(description="拉取/更新子模块代码")
    parser.add_argument("-b", "--block", dest="block", action="store", default="base",
                        help="模块配置名称(默认:base), Git版本配置信息需要")
    parser.add_argument("-f", "--force", dest="force", action="store_true", help="强制更新代码")
    parser.add_argument("-m", "--module", dest="module", action="store", help="子模块名称")

    (args, unkonw) = parser.parse_known_args(argv)
    return args


# 入口
def start(args):
    # 指定模块
    config = utils.read_json(utils.get_path('config/config.json5'))
    git_config = utils.read_git_modules(utils.get_path(".gitmodules"))
    module_config = config['module']

    if args.module is not None and args.module not in module_config:
        raise Exception("传入模块信息错误 -m or --module")

    block_dict = config['block'][args.block]
    for block_name, branch in block_dict.items():
        if args.module is not None and block_name != args.module:
            continue

        git_module(git_config, block_name, branch, args.force)
        # 依赖模块更新
        dep_dict = module_config[block_name]['dependencies']
        for dep_name, dep_branch in dep_dict.items():
            git_module(git_config, dep_name, dep_branch, args.force)


# 启动模块
def git_module(git_config, module, branch, force):
    g_module = git_config["fr-" + module]
    if g_module is None:
        raise Exception("模块配置错误")
    g_module['branch'] = branch

    module_path = utils.get_path(g_module['path'])
    if not os.path.isdir(module_path):
        os.makedirs(module_path)
    git_submodule(module_path, g_module, force)


# 执行git克隆下载
def git_clone(module_path, g_module):
    url = g_module['url']
    branch = g_module['branch']
    stat = subprocess.call("git clone -b %s %s %s --progress" % (branch, url, module_path), shell=True)
    if stat == 0:
        print('Git 子模块 %s 完成! \n' % g_module['path'])
    else:
        raise Exception('Git 子模块 %s 失败!' % g_module['path'])


# 初始化子模块
def git_submodule(module_path, g_module, force=False):
    branch = g_module['branch']
    git_force = force and "-f" or ''
    git_update = "git submodule update --init --remote --checkout %s %s " % (git_force, module_path)
    git_checkout = "git -C %s checkout %s %s" % (module_path, git_force, branch)
    git_branch = "git -C %s branch --set-upstream-to=origin/%s %s" % (module_path, branch, branch)

    git_shell = ''
    if os.path.isdir(os.path.join(module_path, 'src')):
        if force:
            git_shell += ' && git -C %s fetch --all' % module_path
            git_shell += ' && git -C %s reset --hard' % module_path
        git_shell += ' && git -C %s pull' % module_path

    if subprocess.call("%s && %s && %s %s" % (git_update, git_checkout, git_branch, git_shell), shell=True) == 0:
        print('Git 子模块 %s 完成!\n' % g_module['path'])
    else:
        raise Exception('Git 子模块 %s 失败!' % g_module['path'])


if __name__ == '__main__':
    start(parse_args(sys.argv))
