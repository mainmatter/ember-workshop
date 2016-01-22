import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('album', { path: '/albums/:album_id' }, function() {
    this.route('comment');
  });
  this.route('login');
});

export default Router;
