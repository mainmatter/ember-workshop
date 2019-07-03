import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  songCount: reads('model.length'),

  orderedSongs: computed('model.@each.rating', function() {
    return this.model.sortBy('rating').reverse();
  }),

  actions: {
    setSongRating(song, rating) {
      song.set('rating', Number(rating));
    }
  }
});
