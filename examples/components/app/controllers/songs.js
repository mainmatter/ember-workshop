import Ember from 'ember';

const { computed, computed: { alias } } = Ember;

export default Ember.Controller.extend({
  songCount: alias('model.length'),

  orderedSongs: computed('model.@each.rating', function() {
    return this.get('model').sortBy('rating').reverse();
  }),

  actions: {
    setSongRating(song, rating) {
      song.set('rating', rating);
    }
  }
});
