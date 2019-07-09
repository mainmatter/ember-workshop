import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject(),

  actions: {
    invalidateSession() {
      this.session.invalidate();
    }
  }
});
