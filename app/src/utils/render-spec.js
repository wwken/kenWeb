const { test } = require('blue-tape');
var config = require('./../restful-servers/server/config');

const { translateURL } = require('./render');

test('objUtils-spec', t => {
  let url = 'image/Hello.png';
  t.equal(translateURL(url), config.resourceServerAddress + url);

  t.end();
});
