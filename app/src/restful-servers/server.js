/*
  Here the restful API server
 */
require('./util/global');
var config = require('./server/config');
var api = require('./server/api').api;
var server = api.listen(config.server.port, function() {
  var host = config.server.host;
  var port = config.server.port;

  console.log('Listening at http://%s:%s for all web requests', host, port);
});
