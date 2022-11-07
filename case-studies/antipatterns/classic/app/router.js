import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('side-effects');
  this.route('lack-of-public-apis');
  this.route('overusing-the-component-helper');
  this.route('observers');
  this.route('god-objects');
  this.route('notify-property-change');
  this.route('string-actions');
  this.route('two-way-binding');
  this.route('setter-computed-properties');
  this.route('leaking-state');
  this.route('overriding-component-methods');
});

export default Router;
