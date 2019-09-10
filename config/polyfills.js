'use strict';

if (typeof lodash === 'undefined'){
    self.lodash = {};
    self.lodash.isBoolean = require('lodash/isBoolean');
    self.lodash.compact = require('lodash/compact');
    self.lodash.isEqual = require('lodash/isEqual');
    self.lodash.isArray = Array.isArray;
    self.lodash.isString = $xt.core.Types.isString;
    self.lodash.isObject = $xt.core.Types.isObject;
}
