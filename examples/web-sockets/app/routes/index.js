import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  messaging: inject(),

  afterModel() {
    this.messaging.connect();
  }
});
