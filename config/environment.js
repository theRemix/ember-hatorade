/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'itest',
    environment,
    rootURL: '/',
    locationType: 'auto',
    subdomainMapping: {
      '':null,
      'www': 'www'
    },
    faye: {
      URL: 'http://publisher.hatora.de/faye',
    },
    torii: {
      providers: {
        'twitter': {
          appId: 'ehy2oJuRcw3SlUUFJL9CKg',
          requestTokenUri: 'http://lvh.me:5000/users/auth/twitter' /* we don't use this anymore :) */
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
      // Here you can pass flags/options to your application instance
      // when it is created
    }
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
