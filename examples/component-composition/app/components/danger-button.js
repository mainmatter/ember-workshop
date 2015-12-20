import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    click() {
      this.attrs['on-click']();
    }
  }
});
