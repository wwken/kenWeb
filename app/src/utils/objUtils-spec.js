const { test } = require('blue-tape');

const { isArrayEmpty, isVariableEmpty } = require('./objUtils');

test('objUtils-spec', t => {
  t.notOk(isArrayEmpty(['a']), 'isArrayEmpty 1');

  t.notOk(isArrayEmpty(['a', 'b']), 'isArrayEmpty 2');

  t.ok(isArrayEmpty([]), 'isArrayEmpty 3');

  t.ok(isArrayEmpty(), 'isArrayEmpty 4');

  t.ok(isArrayEmpty(null), 'isArrayEmpty 4');

  // test isVariableEmpty
  t.ok(isVariableEmpty(), 'isVariableEmpty 1');

  t.notOk(isVariableEmpty('a'), 'isVariableEmpty 2');

  t.end();
});
