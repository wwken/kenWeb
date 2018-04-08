var _ = require('lodash');

var isVariableNotDefined = function(v) {
  return v === undefined || v === null;
};

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
    return !isVariableNotDefined(a) || _.isEmpty(v) || !a.length;
  },

  isVariableNotDefined,
};
