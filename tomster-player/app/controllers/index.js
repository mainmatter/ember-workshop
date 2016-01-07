import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    selectAlbum(album) {
      this.transitionToRoute('album', album);
    }
  }
});
