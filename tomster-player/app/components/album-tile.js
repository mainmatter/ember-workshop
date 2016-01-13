import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['album-tile'],

  click() {
    const { album, 'on-select-album': onSelectAlbum } = this.getProperties('album', 'on-select-album');

    if (onSelectAlbum) {
      onSelectAlbum(album);
    }
  }
});
