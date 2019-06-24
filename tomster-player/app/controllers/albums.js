import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    selectAlbum(album) {
      this.transitionToRoute('albums.album', album.id);
    }
  }
});
