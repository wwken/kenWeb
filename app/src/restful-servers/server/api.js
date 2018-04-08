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

app.use(bodyParser.raw());

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

app.post('/updateUser', function(req, res, next) {
  var onBody = true;
  var p = validateParameters(res, req, ['id', 'onlineStatus'], onBody);
  var query = 'UPDATE User SET online_status = {0} WHERE id = {1} '.format(
    e(p.onlineStatus, '1'), // Integer column is 1 if not present
    p.id
  );
  info('In updateUser, query: ' + query + '');
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/updateUserResource', upload.single('resource'), function(
  req,
  res,
  next
) {
  var onBody = true;
  var p = validateParameters(
    res,
    req,
    ['fileName', 'resourceId', 'id'],
    onBody
  );
  var query =
    'UPDATE UserResource SET resource = ? , file_name = ?, created_time = CURRENT_TIMESTAMP WHERE user_id = ? and resource_id = ?';
  var buffer = readFile(req.file.path);
  var values = [buffer, "'" + p.fileName + "'", p.id, p.resourceId];

  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, values, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/insertUserResource', upload.single('resource'), function(
  req,
  res,
  next
) {
  var onBody = true;
  var p = validateParameters(
    res,
    req,
    ['fileName', 'resourceId', 'id'],
    onBody
  );
  var query = 'INSERT INTO UserResource SET ?';
  var buffer = readFile(req.file.path);
  var values = {
    user_id: p.id,
    resource_id: p.resourceId,
    resource: buffer,
    file_name: "'" + p.fileName + "'",
  };
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, values, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/insertResource', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, [], onBody);
  var query = 'INSERT INTO Resource SET ?';
  var values = {
    description: p.description,
  };
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, values, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/insertRelation', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['description'], onBody);
  var query = 'INSERT INTO Relation SET ?';
  var values = {
    description: p.description,
  };
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, values, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/insertNotification', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['description', 'template'], onBody);
  var query = 'INSERT INTO Notification SET ?';
  var values = {
    description: p.description,
    template: p.template,
  };
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, values, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/insertUserRelation', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['description'], onBody);
  var query = "call insertUserRelation({0}, {1}, '{2}', '{3}', @pInsertedId); select @pInsertedId;".format(
    p.id,
    p.relationId,
    p.relation,
    p.description
  );
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/updateUserRelation', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['description'], onBody);
  var query = "call updateUserRelation({0}, {1}, '{2}', '{3}', @pUpdatedId); select @pUpdatedId;".format(
    p.id,
    p.relationId,
    p.relation,
    p.description
  );
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/updateUserNotification', function(req, res) {
  var onBody = true;
  var p = validateParameters(
    res,
    req,
    ['idsStr', 'isSeen', 'isDeleted'],
    onBody
  );
  var query = "call updateUserNotification('{0}', {1}, {2});".format(
    p.idsStr,
    p.isSeen,
    p.isDeleted
  );
  info('In updateUserNotification, storeProc: ' + query);
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/insertUserNotification', function(req, res) {
  var onBody = true;
  var p = validateParameters(
    res,
    req,
    ['id', 'issuerId', 'notificationId', 'content'],
    onBody
  );
  var query = "call insertUserNotification({0}, {1}, {2}, '{3}', @pInsertedId, @pCreatedTime); select @pInsertedId, @pCreatedTime;".format(
    p.id,
    p.issuerId,
    p.notificationId,
    p.content
  );
  getDBPool(req).getConnection(function(err, conn) {
    info('In insertUserNotification, storeProc: ' + query);
    conn.query(query, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/insertUserLocation', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['id', 'lnt', 'lng'], onBody);
  var storeProc = "call insertUserLocation({0}, {1}, {2}, '{3}', {4}, {5}, {6}, @pInsertedId); select @pInsertedId;".format(
    p.id,
    p.lnt,
    p.lng,
    p.message,
    e(p.userRelationId, 'NULL'), // Integer column is NULL if not present
    e(p.timeout, 'NULL'), // Integer column is NULL if not present
    e(p.radiusInMile, '10') // Integer column is NULL if not present
  );
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(storeProc, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

/*
    This is for debugging/back door developments only
 */
app.post('/_updateUserLocation', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['id', 'createdTime'], onBody);
  var query = "UPDATE UserLocation set created_time='{0}' WHERE user_id={1} and is_present=1;".format(
    p.createdTime,
    p.id
  );
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/getUserResource', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['id', 'resourceId'], onBody);
  getDBPool(req).getConnection(function(err, conn) {
    var storeProc = 'call getUserResource({0}, {1});'.format(
      p.id,
      p.resourceId
    );
    info('In getUserResource, storeProc: ' + storeProc);
    conn.query(storeProc, function(err, rows) {
      conn.release();
      outputRaw(res, err, rows, 0, p['httpContentType']);
    });
  });
});

app.post('/getNotification', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, [], onBody);
  getDBPool(req).getConnection(function(err, conn) {
    var query = 'select id, description, template from Notification';
    info('In getNotification, query: ' + query);
    conn.query(query, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

app.post('/getUserNotification', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['id'], onBody);
  getDBPool(req).getConnection(function(err, conn) {
    var storeProc = 'call getUserNotification({0}, {1});'.format(
      p.id,
      g(p.upToHowManyDays, '30')
    );
    info('In getUserNotification, storeProc: ' + storeProc);
    conn.query(storeProc, function(err, rows) {
      conn.release();
      output(res, err, rows, 0);
    });
  });
});

app.get('/findFriends', function(req, res) {
  var p = req.query;
  getDBPool(req).getConnection(function(err, conn) {
    var storeProc = "call findFriends({0}, {1}, {2}, {3}, {4}, '{5}', {6}, {7});".format(
      p.id,
      g(p.relationId, 'NULL'),
      p.lat,
      p.lng,
      g(p.radiusInMiles, 5.0),
      p.intention,
      g(p.lowerLimit, 'NULL'),
      g(p.upperLimit, 'NULL')
    );
    // storeProc is typically: call findFriends(1, 1, 40.587372, -73.986032, 5, '', NULL, NULL);
    info('findFriends: ' + storeProc);
    conn.query(storeProc, function(err, rows) {
      conn.release();
      output(res, err, rows, 0);
    });
  });
});

app.get('/getUserProfile', function(req, res) {
  var p = req.query;
  getDBPool(req).getConnection(function(err, conn) {
    var storeProc = 'call getUserProfile({0});'.format(p.id);
    conn.query(storeProc, function(err, rows) {
      conn.release();
      output(res, err, rows, 0);
    });
  });
});

app.get('/_loadFileIntoDatabase', function(req, res) {
  var p = validateParameters(res, req, [
    'localPath',
    'fileName',
    'resourceId',
    'id',
  ]);
  var temp_path = path.join(p.localPath, p.fileName);
  if (!fs.existsSync(temp_path)) {
    output(res, temp_path + ' does not exist!', null);
    return;
  }
  fs.open(temp_path, 'r', function(status, fd) {
    if (status) {
      console.log(status.message);
      return;
    }
    var stats = fs.statSync(temp_path);
    var fileSize = stats['size'];
    var buffer = new Buffer(fileSize);
    fs.read(fd, buffer, 0, fileSize, 0, function(err, num) {
      var query = 'INSERT INTO UserResource SET ?';
      var t = db.schema.UserResource;
      var values = createParams(
        [t.user_id, t.resource_id, t.resource, t.file_name],
        [p.id, p.resourceId, buffer, "'" + p.fileName + "'"]
      );
      getDBPool(req).getConnection(function(err, conn) {
        conn.query(query, values, function(err, rows) {
          conn.release();
          output(res, err, rows);
        });
      });
    });
  });
});

// These are delet operations - danergous zone
app.post('/deleteUserLocation', function(req, res) {
  var onBody = true;
  var p = validateParameters(res, req, ['id'], onBody);
  var query = 'UPDATE UserLocation set is_present=0 WHERE id={0};'.format(p.id);
  getDBPool(req).getConnection(function(err, conn) {
    conn.query(query, function(err, rows) {
      conn.release();
      output(res, err, rows);
    });
  });
});

module.exports = {
  api: app,
};
