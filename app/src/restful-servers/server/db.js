var config = require('./config');
var mysql = require('mysql');

var pool = mysql.createPool({
  host: config.server.host,
  user: config.server.user,
  password: config.server.password,
  database: config.server.database,
  multipleStatements: true,
});

var poolTest = mysql.createPool({
  host: config.server.host,
  user: config.server.user,
  password: config.server.password,
  database: config.server.databasetest,
  multipleStatements: true,
});

var schema = {
  User: {
    name: 'User',
    id: 'id',
    facebook_id: 'facebook_id',
    google_id: 'google_id',
    password: 'password',
    email: 'email',
    first_name: 'first_name',
    last_name: 'last_name',
    sex: 'sex',
    birthday: 'birthday',
    online_status: 'online_status',
  },
  UserLocation: {
    name: 'UserLocation',
    id: 'id',
    user_id: 'user_id',
    location: 'location',
    message: 'message',
    created_time: 'created_time',
  },
  UserResource: {
    name: 'UserResource',
    id: 'id',
    user_id: 'user_id',
    resource_id: 'resource_id',
    resource: 'resource',
    file_name: 'file_name',
    created_time: 'created_time',
  },
};

module.exports = {
  pool: pool,
  poolTest: poolTest,
  schema: schema,
};
