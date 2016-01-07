import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    const album = this.get('album');

    this.attrs['on-select-album'](album);
  }
});
