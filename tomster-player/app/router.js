import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('albums', { path: 'library' }, function() {
    this.route('album', { path: ':album_id'});
  });
});

export default Router;
