global.__DEV__ = true; // Inject `__DEV__` global normally handled by Webpack
global.console.debug = function() {}; // Send console.debug calls to /dev/null

// const createMockStorage = require('../helper/test').createMockStorage

global.document = require('jsdom').jsdom('<body><div id="app"></div></body>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

// global.localStorage = global.window.localStorage = createMockStorage()
// global.sessionStorage = global.window.sessionStorage = createMockStorage()
global.Storage = function() {};

global.FormData = require('form-data');
