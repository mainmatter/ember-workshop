// app/services/error-reporting.js
import Ember from 'ember';

const { computed: { reads } } = Ember;

export default Ember.Service.extend({
  errorCount: reads('errors.length'),

  init() {
    this._super();
    this.set('errors', []);
  },

  reportError(error) {
    this.get('errors').pushObject(error);
  }
});