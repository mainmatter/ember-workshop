import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('media', function() {
    this.route('medium', { path: '/:mediumId' });
  });
  this.route('fail');
  this.route('not-found', { path: '*wildcard' });
});

export default Router;
