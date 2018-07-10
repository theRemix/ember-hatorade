/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'itest',
    environment,
    rootURL: '/',
    locationType: 'auto',
    danthes_token: '588d158962940ed4c022ae44526889ee809343fea3cc47b5ce159940cf4c110d0f769517fc7b622c',
    subdomainMapping: {
      '':null,
      'www': 'www'
    },
    faye: {
      URL: 'http://publisher.hatora.de/faye',
    },
    torii: {
      sessionServiceName: 'appSession',
      allowUnsafeRedirect: true,
      providers: {
        twitter: {
          appId: 'ehy2oJuRcw3SlUUFJL9CKg',
          requestTokenUri: 'http://api.hatora.de/users/auth/twitter' /* we don't use this anymore :) */
        }
      }
    },
    moment: { includeLocales: true },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      usingCors: true,
      apiURL: 'http://api.hatora.de'
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'default-src': [ "'none'" ],
      'script-src':  [ "'self'" , "http://publisher.hatora.de/faye", "'unsafe-inline'" , "'unsafe-eval'", "http://api.hatora.de", "http://localhost:9292", "http://lvh.me:7020/livereload.js" ],
      'font-src':    [ "'self'"],
      'connect-src': [ "'self'", "*.hatora.de", "ws://publisher.hatora.de", "http://pbs.twimg.com", "http://publisher.hatora.de/faye", "ws://lvh.me:7020/livereload" ],
      'img-src':     [ "'self'", "http://pbs.twimg.com/" ],
      'report-uri':  ["'localhost'"],
      'style-src':   [ "'self'", "'unsafe-inline'" ],
      'frame-src':   ["'none'"]
    },
    apiScheme: 'http://',
    apiHost: 'api.hatora.de',
    apiPort: '',
    publisherUrl: 'http://publisher.hatora.de'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiScheme = 'http://';
    ENV.apiHost   = 'api.hatora.de';
    ENV.apiPort   = '';
    ENV.publisherUrl   = 'http://publisher.hatora.de';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
