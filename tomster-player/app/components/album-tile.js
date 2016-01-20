import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    const album = this.getAttr('album');
    const onSelectAlbum = this.getAttr('on-select-album');

    if (onSelectAlbum) {
      onSelectAlbum(album);
    }
  }
});
