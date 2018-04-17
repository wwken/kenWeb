var config = require('./../restful-servers/server/config');

module.exports = {
  getImageURL: function(u) {
    return config.resourceServerAddress + '/img/' + u;
  },
};
