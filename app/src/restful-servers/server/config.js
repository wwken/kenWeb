// isTrue gets a boolean value from the given string
var isTrue = function isTrue(val, def) {
  if (!val) {
    return def;
  }

  var start = val.toLowerCase()[0];
  if (start === 'f' || start === '0') {
    return false;
  } else if (start === 't' || start === '1') {
    return true;
  } else {
    return def;
  }
};

var server = (module.exports.server = {
  env: process.env.KENWEB_ENV || 'dev',

  // Restful webserver configuration data
  protocol: process.env.KENWEB_PROTOCOL || 'http',
  host: process.env.KENWEB_HOST || 'localhost',
  port: process.env.KENWEB_PORT || 3001, // export KENWEB_PORT=3001 # for dev environment

  //Database configuration
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dev',
  databasetest: 'dev-test', // This is for unit-test dev only
});

module.exports.serverAddress =
  server.protocol + '://' + server.host + ':' + server.port;
module.exports.resourceServerAddress =
  server.protocol + '://' + server.host + ':' + server.port + '/wuahge/';

module.exports.IsDev = function() {
  return server.env.toLowerCase() == 'dev';
};
module.exports.IsProd = function() {
  return server.env.toLowerCase() == 'prod';
};
