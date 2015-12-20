import Ember from 'ember';

export default Ember.Component.extend({
  doubleClick() {
    this.attrs['on-select-song'](this.get('song'));
  }
});
