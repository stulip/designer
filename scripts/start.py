#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# author tangzehua
# version v1.0.0

import os
import sys
import utils



def parse_args(argv):
    from argparse import ArgumentParser

    parser = ArgumentParser(description="启动代理服务")
    parser.add_argument("-t", "--test", dest="test", action="store_true", help="是否启动测试模块")
    (args, unkonw) = parser.parse_known_args(argv)
    return args


def start(argv, args):
    module = None
    if len(argv) > 1:
        module = argv[1]

    start_script = utils.get_path("scripts/start.js")
    if module is None or module.find("-") != -1:
        args.test and print('启动测试模块')
        os.system('node %s --test %s --dev' % (start_script, args.test and 1 or 0))
    else:
        print("启动模块: %s" % module.upper())
        os.system('node %s --module %s --dev' % (start_script, module))


if __name__ == '__main__':
    start(sys.argv, parse_args(sys.argv))
