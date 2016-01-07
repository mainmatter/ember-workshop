import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    play() {
      // TODO: play with player service
      console.log('now playing', this.get('song'));
    }
  }
});
