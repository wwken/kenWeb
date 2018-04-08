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

  isVariableNotDefined: function(v) {
    return v === undefined || v === null;
  },

  isVariableDefined: function(v) {
    return !isVariableNotDefined(v);
  },

  isVariableEmpty: function(v) {
    return v === '';
  },

  getAllValuesFromObject: function(o) {
    return _getAllValuesFromObject(o);
  },
};
