import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),

  sessionAuthenticated() {
    this._super(...arguments);

    this.get('commentUpdates').connect();
  },

  sessionInvalidated() {
    this.get('commentUpdates').disconnect();

    this._super(...arguments);
  }
});
