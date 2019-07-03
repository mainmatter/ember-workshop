import Component from '@ember/component';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Component.extend({
  errorReporting: inject(),

  errorCount: reads('errorReporting.errorCount'),
  errors: reads('errorReporting.errors'),

  actions: {
    textEntered(text) {
      this.set('errorText', text);
    },

    reportError(e) {
      e.preventDefault();
  
      this.errorReporting.reportError(this.errorText);
      this.set('errorText', null);
    }
  }
});
