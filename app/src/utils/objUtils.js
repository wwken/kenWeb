var _ = require('lodash');
var config = require('./../restful-servers/server/config');
var isVariableNotDefined = function(v) {
  return v === undefined || v === null;
};

var MAX_SHORT_DISPLAY = 200;

module.exports = {
  createParams: function(keys, values) {
    var v = {};
    var arrayLength = keys.length;
    for (var i = 0; i < arrayLength; i++) {
      if (isVariableNotDefined(keys[i])) throw Error('Undefined key at ' + i);
      v[keys[i]] = values[i];
    }
    return v;
  },

  isVariableDefined: function(v) {
    return !isVariableNotDefined(v);
  },

  isVariableEmpty: function(v) {
    return _.isEmpty(v);
  },

  isArrayEmpty: function(a) {
    return isVariableNotDefined(a) || _.isEmpty(a) || !a.length;
  },

  isVariableNotDefined,

  translateURL: function(url) {
    if (url.indexOf('http') == 0) {
      return url;
    } else {
      var z = config.resourceServerAddress + url;
      return z;
    }
  },

  short: function(str) {
    return str.slice(0, MAX_SHORT_DISPLAY) + '...';
  },
};
