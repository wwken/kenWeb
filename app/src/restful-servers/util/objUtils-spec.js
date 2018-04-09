const { test } = require('blue-tape');

const { isArrayEmpty } = require('./objUtils');

test('objUtils-spec', t => {
  const result = isArrayEmpty(['a']);

  t.ok(result, 'isArrayEmpty 1');

  t.end();
});
