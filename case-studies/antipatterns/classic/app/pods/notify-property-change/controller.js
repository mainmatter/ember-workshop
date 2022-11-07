import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  refresh: null,

  value: computed('refresh', function () {
    return Math.random();
  }),

  actions: {
    updateValue() {
      this.notifyPropertyChange('refresh');
    },
  },
});
