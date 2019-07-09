import EmberRouter from '@ember/routing/router';
import config from 'tomster-player/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('albums', { path: 'library' }, function () {
    this.route('album', { path: ':album_id' });
  });
});
