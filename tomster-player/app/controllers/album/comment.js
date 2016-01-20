import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    endCommenting(album) {
      this.transitionToRoute('album', album);
    }
  }
});
