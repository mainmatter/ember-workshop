import Component from '@ember/component';
import { computed } from '@ember/object';
import _ from 'lodash';

const MAX_RATING = 5;

export default Component.extend({
  roundedRating: computed('rating', function() {
    const rating = this.getAttr('rating');

    return Math.round(rating);
  }),

  activeStars: computed('roundedRating', function() {
    const roundedRating = this.roundedRating;

    return _.range(0, roundedRating);
  }),

  inactiveStars: computed('roundedRating', function() {
    const roundedRating = this.roundedRating;

    return _.range(roundedRating, MAX_RATING);
  })
});
