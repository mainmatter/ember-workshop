import Component from '@ember/component';

export default Component.extend({
  click() {
    const album = this.getAttr('album');
    const onSelectAlbum = this.getAttr('on-select-album');

    if (onSelectAlbum) {
      onSelectAlbum(album);
    }
  }
});
