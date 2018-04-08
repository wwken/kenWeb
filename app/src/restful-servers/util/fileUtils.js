require('./global');

var fs = require('fs');

var getFileExtension = function(p) {
  return p.split('.').pop();
};

module.exports = {
  readFile: function(path) {
    return fs.readFileSync(path);
  },

  readJsonFile: function(jPath) {
    return JSON.parse(fs.readFileSync(jPath, 'utf8'));
  },

  getFileExtension: getFileExtension,

  isHTMLFile: function(p) {
    var e = getFileExtension(p);
    if (e === 'htm' || e === 'html') return true;
    else return false;
  },
};
