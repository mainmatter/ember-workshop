import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  rating: computed('album.comments.@each.{rating,isNew}', function() {
    let ratings = this.album.comments
      .toArray()
      .filter((c) => !c.isNew)
      .map((c) => c.rating);
    let totalRating = ratings.reduce((acc, r) => acc + r, 0);

    return ratings.length > 0 ? totalRating / ratings.length : 0;
  })
});
