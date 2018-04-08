var express = require('express');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var methodOverride = require('method-override');
// var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
// var errorHandler = require('errorhandler');

var app = express();
var db = require('./db');
var g = require('./../util/tools').g;
var e = require('./../util/tools').e;
var getTimeStr = require('./../util/tools').getTimeStr;
var createParams = require('./../util/dbUtils').createParams;
var isVariableNotDefined = require('./../util/tools').isVariableNotDefined;
var isVariableDefined = require('./../util/tools').isVariableDefined;
var readFile = require('./../util/fileUtils').readFile;
var removeSingleQuotes = require('./../util/tools').removeSingleQuotes;
var validateParameters = require('./../util/tools').validateParameters;
var buildInsertSQLQuery = require('./../util/tools').buildInsertSQLQuery;
var fs = require('fs');
var path = require('path');
var isHTMLFile = require('./../util/fileUtils').isHTMLFile;

var output = function(res, err, rows, indexRowToBeReturn) {
  if (isVariableNotDefined(err) || err == 'null') {
    if (indexRowToBeReturn != undefined)
      res.json(rows[indexRowToBeReturn]); // rows[indexRowToBeReturn] is the actual data
    else res.json(rows);
  } else {
    res.json(err);
  }
};

var outputRaw = function(res, err, rows, indexRowToBeReturn, httpContentType) {
  if (isVariableNotDefined(err) || err == 'null') {
    if (indexRowToBeReturn != undefined) {
      if (isVariableDefined(rows[indexRowToBeReturn][0])) {
        if (isVariableDefined(httpContentType)) {
          res.setHeader('Content-Type', httpContentType);
        }
        res.end(rows[indexRowToBeReturn][0].resource);
      } else {
        res.end(new Buffer(0)); // return an empty response if nothing
      }
    } else {
      res.end(rows);
    }
  } else {
    res.writeHead(500);
    res.end(err);
  }
};

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    // Take an id + resourceId + original fileName as fileName
    cb(
      null,
      '{0}-{1}-{2}'.format(
        req.body.id,
        req.body.resourceId,
        removeSingleQuotes(req.body.fileName)
      )
    );
  },
});

var upload = multer({ storage: storage });

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.raw());

// parse multipart/form-data
// app.use(upload);

// app.use(express.json());
// app.use(express.urlencoded());

var info = function(s) {
  console.info(getTimeStr() + ' ' + s);
};

var getDBPool = function(req) {
  if (req.method.toUpperCase() === 'GET') {
    // GET method
    if (isVariableDefined(req.query.isTest)) {
      return db.poolTest;
    } else {
      return db.pool;
    }
  } else if (req.method.toUpperCase() === 'POST') {
    if (isVariableDefined(req.body.isTest)) {
      return db.poolTest;
    } else {
      return db.pool;
    }
  } else {
    console.log('ERROR - unsupported method: ' + req.method.toUpperCase());
    return null;
  }
};

app.get('/public-static/*', function(req, res) {
  var filePath = '.' + req.url;
  if (isHTMLFile(req.url)) {
    fs.readFile(filePath, function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data, 'utf-8');
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Unsupported file type', 'utf-8');
  }
});

app.post('/users/authenticate', function(req, res, next) {
  var onBody = true;
  var p = validateParameters(res, req, ['username', 'password'], onBody);
  debugger;
  res.json({ a: 1 });
});

/*
    This one will do update automatically if unique key exists
 */
app.post('/insertUser', function(req, res, next) {
  var onBody = true;
  var p = validateParameters(res, req, ['email'], onBody);
  var query =
    'INSERT INTO User SET facebook_id = ?, google_id = ?, password = ?, email = ?, first_name = ?, last_name = ?, sex = ? , birthday = ?, online_status = ?' +
    ' ON DUPLICATE KEY UPDATE facebook_id=VALUES(facebook_id), google_id=VALUES(google_id), password=VALUES(password), first_name=VALUES(first_name), last_name=VALUES(last_name), sex=VALUES(sex), birthday=VALUES(birthday), online_status=VALUES(online_status)';
  var values = [
    p.facebookId,
    p.googleId,
    p.password,
    p.email,
    p.firstName,
    p.lastName,
    e(p.sex, '-1'), // Integer column is -1 if not present
    p.birthday,
    e(p.onlineStatus, '1'), // Integer column is 1 if not present
  ];
  info('In insertUser, query: ' + query + ', values: ' + values);
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, values, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

module.exports = {
  api: app,
};
