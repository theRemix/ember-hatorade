/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hatorade',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    subdomainMapping: {
      '':null,
      'www': 'www'
    },
    torii: {
      providers: {
        'twitter': {
          appId: 'ehy2oJuRcw3SlUUFJL9CKg',
          requestTokenUri: 'http://lvh.me:3000/users/auth/twitter', /* we don't use this anymore :) */
        }
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' 'http://api.hatora.de/' 'http://localhost:9292'",
      'font-src': "'self'",
      'connect-src': "'self' 'http://api.hatora.de/' 'ws://localhost:9292/faye' 'http://localhost:9292/faye'",
      'img-src': "'self' 'http://pbs.twimg.com/'",
      'report-uri':"'localhost'",
      'style-src': "'self' 'unsafe-inline'",
      'frame-src': "'none'"
    }
  };

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = false;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.apiScheme = 'http://'
    ENV.apiHost   = 'lvh.me';
    ENV.apiPort   = ':3000';
    ENV.publisherUrl   = 'http://localhost:9292';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.apiScheme = 'http://'
    ENV.apiHost   = 'hatora.de';
    ENV.apiPort   = '';
    ENV.publisherUrl   = 'http://publisher.hatora.de';
  }

  return ENV;
};
