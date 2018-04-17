const { test } = require('blue-tape');
var config = require('./../restful-servers/server/config');
const { isArrayEmpty, isVariableEmpty, translateURL } = require('./objUtils');

test('objUtils-spec', t => {
  t.notOk(isArrayEmpty(['a']), 'isArrayEmpty 1');

  t.notOk(isArrayEmpty(['a', 'b']), 'isArrayEmpty 2');

  t.ok(isArrayEmpty([]), 'isArrayEmpty 3');

  t.ok(isArrayEmpty(), 'isArrayEmpty 4');

  t.ok(isArrayEmpty(null), 'isArrayEmpty 4');

  // test isVariableEmpty
  t.ok(isVariableEmpty(), 'isVariableEmpty 1');

  t.notOk(isVariableEmpty('a'), 'isVariableEmpty 2');

  const url = 'image/Hello.png';
  t.equal(translateURL(url), config.resourceServerAddress + url);

  t.end();
});
