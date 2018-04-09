require('./global');
var isVariableNotDefined = require('../../utils/objUtils').isVariableNotDefined;

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
};
