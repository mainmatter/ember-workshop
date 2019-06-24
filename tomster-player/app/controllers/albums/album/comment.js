import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    endCommenting(album) {
      this.transitionToRoute('albums.album', album);
    }
  }
});
