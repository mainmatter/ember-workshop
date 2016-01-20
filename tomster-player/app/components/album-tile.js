import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    const album = this.get('album');
    const onSelectAlbum = this.attrs['on-select-album'];

    if (onSelectAlbum) {
      onSelectAlbum(album);
    }
  }
});
