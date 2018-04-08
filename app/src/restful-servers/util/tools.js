require('./global');

/**
 * Created by Ken Wu on 1/14/17.
 */

var _getAllValuesFromObject = function(o) {
  return Object.getOwnPropertyNames(o).map(function(key) {
    return o[key];
  });
};

var isVariableNotDefined = function(v) {
  return v === undefined || v === null;
};

var isVariableDefined = function(v) {
  return !isVariableNotDefined(v);
};

var isVariableEmpty = function(v) {
  return v === '';
};

var getAllValuesFromObject = function(o) {
  return _getAllValuesFromObject(o);
};

// takes in an integer (97746037) and formats it with commas (97,746,037)
var g = function(v, defaultValue) {
  if (isVariableNotDefined(v)) {
    return defaultValue;
  } else {
    return v;
  }
};

// It is a strong version of g, it also takes care the case where variable is empty
//  Usually it is for usage of integer id columns
var e = function(v, defaultValue) {
  if (isVariableNotDefined(v) || isVariableEmpty(v)) {
    return defaultValue;
  } else {
    return v;
  }
};

// make sure the each key in keysToBeValidated is defined in parms
var validateParameters = function(
  httpResponse,
  parms,
  keysToBeValidated,
  onBody
) {
  var o = parms.query;
  if (onBody !== undefined && onBody) {
    o = parms.body;
  }

  for (var i = 0; i < keysToBeValidated.length; i++) {
    if (o[keysToBeValidated[i]] === undefined) {
      httpResponse.json({
        'request error!':
          keysToBeValidated[i] + ' is not supplied in the http request.',
      });
    }
  }

  return o;
};

// SQL STUFFS
var buildInsertSQLQuery = function(tableName, parms, optionalStatement) {
  var q = 'INSERT INTO {0}'.format(tableName);
  var keys = Object.keys(parms);
  var values = _getAllValuesFromObject(parms);
  q = q + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ') ';
  if (optionalStatement) {
    q = q + optionalStatement;
  }
  return q;
};

var removeSingleQuotes = function(s) {
  return s.replace(/'/g, '');
};

var getTimeStr = function() {
  return new Date();
};

module.exports = {
  isVariableNotDefined: isVariableNotDefined,
  isVariableDefined: isVariableDefined,
  getAllValuesFromObject: getAllValuesFromObject,
  g: g,
  e: e,
  validateParameters: validateParameters,
  buildInsertSQLQuery: buildInsertSQLQuery,
  removeSingleQuotes: removeSingleQuotes,
  getTimeStr: getTimeStr,
};
