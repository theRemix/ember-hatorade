/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-bootstrap': {
      'importBootstrapTheme': true
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  app.import('bower_components/faye/include.js');
  app.import('bower_components/bootstrap/js/modal.js');
  app.import('bower_components/bootstrap-tagsinput/src/bootstrap-tagsinput.js');
  app.import('bower_components/bootstrap-tagsinput/src/bootstrap-tagsinput.css');
  app.import('bower_components/unicode-string-utils/unicode-string-utils.js');
  app.import('bower_components/js-cookie/src/js.cookie.js');
  return app.toTree();
};
