import Ember from 'ember';

const { computed: { alias } } = Ember;

export default Ember.Controller.extend({
  songCount: alias('model.length'),

  actions: {
    deleteSong(song) {
      song.destroyRecord();
    }
  }
});
