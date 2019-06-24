import Ember from 'ember';
import _ from 'lodash';

const { computed } = Ember;

const MAX_RATING = 5;

export default Ember.Component.extend({
  roundedRating: computed('rating', function() {
    const rating = this.getAttr('rating');

    return Math.round(rating);
  }),

  activeStars: computed('roundedRating', function() {
    const roundedRating = this.get('roundedRating');

    return _.range(0, roundedRating);
  }),

  inactiveStars: computed('roundedRating', function() {
    const roundedRating = this.get('roundedRating');

    return _.range(roundedRating, MAX_RATING);
  })
});
