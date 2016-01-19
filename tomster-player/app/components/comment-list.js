import Ember from 'ember';

export default Ember.Component.extend({
  isAdding: false,

  actions: {
    startAdding() {
      this.set('isAdding', true);
    },

    endAdding() {
      this.set('isAdding', false);
    }
  }
});
