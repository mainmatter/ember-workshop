import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    endCommenting(album) {
      console.log(arguments)
      this.transitionToRoute('albums.album', album);
    }
  }
});
