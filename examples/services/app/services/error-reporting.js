import Service from '@ember/service';
import { reads } from '@ember/object/computed';

export default Service.extend({
  errorCount: reads('errors.length'),

  init() {
    this._super(...arguments);

    this.set('errors', []);
  },

  reportError(error) {
    this.errors.pushObject(error);
  }
});
