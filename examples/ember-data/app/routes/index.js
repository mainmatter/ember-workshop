import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  store: inject(),

  beforeModel() {
    window.store = this.store;
  }
});
