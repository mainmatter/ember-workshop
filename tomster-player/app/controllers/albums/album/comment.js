import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    endCommenting(album) {
      this.transitionToRoute('albums.album', album);
    }
  }
});
