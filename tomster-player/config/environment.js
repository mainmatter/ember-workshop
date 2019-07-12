'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'tomster-player',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    api: {
      namespace: 'api'
    },

    sockets: {
      host: 'http://localhost:3000'
    },

    oauth2: {
      tokenEndpoint: '/token'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.api.host = 'https://ember-workshop-server.herokuapp.com';
    ENV.sockets.host = 'https://ember-workshop-server.herokuapp.com';
    ENV.oauth2.tokenEndpoint = 'https://ember-workshop-server.herokuapp.com/token';
    // here you can enable a production-specific feature
  }

  return ENV;
};
