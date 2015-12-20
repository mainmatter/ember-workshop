import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removeItem(item) {
      this.attrs['on-remove-item'](item);
    }
  }
});
