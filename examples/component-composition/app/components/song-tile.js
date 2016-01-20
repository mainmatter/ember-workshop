import Ember from 'ember';

export default Ember.Component.extend({
  doubleClick() {
    this.getAttr('on-select-song')(this.get('song'));
  }
});
