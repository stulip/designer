/**
 *
 * @author tangzehua
 * @sine 2019-09-26 10:23
 */

import {Exps} from '@xt-web/core'

export const Required = function (exps) {
    this.exec  = function (objValue){
        return Exps(exps, objValue)
    };
};

export const required = function (exps){
    return new Required(exps)
};
