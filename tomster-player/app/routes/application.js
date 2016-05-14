import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { RSVP, inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  commentUpdates: service(),
  session: service(),

  afterModel() {
    if (this.get('session.isAuthenticated')) {
      this.get('commentUpdates').connect();
    }
  },

  sessionAuthenticated() {
    this._super(...arguments);

    this.get('commentUpdates').connect();
  },

  sessionInvalidated() {
    this.get('commentUpdates').disconnect();

    this._super(...arguments);
  }
});
