import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('media', function() {
    this.route('medium', { path: '/:medium_id' });
  });
  this.route('fail');
  this.route('not-found', { path: '*wildcard' });
});

export default Router;
