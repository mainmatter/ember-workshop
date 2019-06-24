import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service('session'),

  actions: {
    invalidateSession() {
      const session = this.session;

      session.invalidate();
    }
  }
});
