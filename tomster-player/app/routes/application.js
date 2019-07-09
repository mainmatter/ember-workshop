import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject } from '@ember/service';

export default Route.extend(ApplicationRouteMixin, {
  session: inject(),
  socket: inject(),

  afterModel() {
    if (this.session.isAuthenticated) {
      this.socket.connect();
    }
  },
	
  sessionAuthenticated() {
    this._super(...arguments);
	
    this.socket.connect();
  },
	
  sessionInvalidated() {
    this._super(...arguments);

    this.socket.disconnect();
  }
});
