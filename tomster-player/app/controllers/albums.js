import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    selectAlbum(album) {
      this.transitionToRoute('albums.album', album.id);
    }
  }
});
