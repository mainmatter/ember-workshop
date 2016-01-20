// app/components/error-reporter.js
import Ember from 'ember';

const {
  inject: { service },
  computed: { reads }
} = Ember;

export default Ember.Component.extend({
  errorReporting: service(),

  errorCount: reads('errorReporting.errorCount'),
  errors: reads('errorReporting.errors'),

  actions: {
    textEntered(text) {
      this.set('errorText', text);
    },

    reportError(e) {
      e.preventDefault();
  
      const error = this.get('errorText');
      this.get('errorReporting').reportError(error);
      this.set('errorText', null);
    }
  }
});