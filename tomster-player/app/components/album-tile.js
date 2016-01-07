import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['album-tile'],

  click() {
    const album = this.get('album');

    this.attrs['on-select-album'](album);
  }
});
