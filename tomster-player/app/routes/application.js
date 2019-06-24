import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  commentUpdates: service(),
  session: service(),

  afterModel() {
    if (this.get('session.isAuthenticated')) {
      this.commentUpdates.connect();
    }
  },

  sessionAuthenticated() {
    this._super(...arguments);

    this.commentUpdates.connect();
  },

  sessionInvalidated() {
    this.commentUpdates.disconnect();

    this._super(...arguments);
  }
});
