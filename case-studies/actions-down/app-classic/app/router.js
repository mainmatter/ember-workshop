import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tight-coupling');
  this.route('move-state-to-controller');
  this.route('send-signal-from-controller');
});

export default Router;
