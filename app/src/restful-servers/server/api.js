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
var isVariableNotDefined = require('../../utils/objUtils').isVariableNotDefined;
var isVariableDefined = require('../../utils/objUtils').isVariableDefined;
var isVariableEmpty = require('../../utils/objUtils').isVariableEmpty;
var isArrayEmpty = require('../../utils/objUtils').isArrayEmpty;
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
    else res.json({ user: 'dewww' });
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

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var info = function(s) {
  console.info(getTimeStr() + ' ' + s);
};

var onBodyJasonParse = function(x) {
  return JSON.parse(x.body['json']);
};
var onBody = function(x) {
  return x.body;
};

var getDBPool = function(req) {
  var p = null;
  if (req.method.toUpperCase() === 'GET') {
    // GET method
    if (isVariableDefined(req.query.isTest)) {
      p = db.poolTest;
    } else {
      p = db.pool;
    }
  } else if (req.method.toUpperCase() === 'POST') {
    if (isVariableDefined(req.body.isTest)) {
      p = db.poolTest;
    } else {
      p = db.pool;
    }
  } else {
    console.log('ERROR - unsupported method: ' + req.method.toUpperCase());
  }
  console.log('In getDBPool, p is ', p);
  return p;
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
  var p = validateParameters(
    res,
    req,
    ['username', 'password'],
    onBodyJasonParse
  );
  var query =
    'select first_name, last_name from User where email = ? and password = ?';
  var values = [p.username, p.password];
  info('In /users/authenticate, query: ' + query + ', values: ' + values);
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, values, function(err, rows) {
      conn.release();
      if (isVariableEmpty(err)) {
        if (!isArrayEmpty(rows)) {
          res.send(rows);
        }
        res.end('ok');
      } else {
        next(err);
      }
    });
  });
});

/*
    This one will do update automatically if unique key exists
 */
app.post('/insertUser', function(req, res, next) {
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
