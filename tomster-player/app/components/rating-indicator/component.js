import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  activeStars: computed('rating', function() {
    let roundedRating = Math.round(this.rating)

    return new Array(roundedRating);
  }),
});
