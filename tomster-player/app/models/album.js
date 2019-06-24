import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import _ from 'lodash';

export default Model.extend({
  title:    attr('string'),
  coverUrl: attr('string'),

  songs: hasMany(),
  comments: hasMany(),

  averageRating: computed('comments.@each.rating', 'comments.@each.isNew', function() {
    const savedComments = this.comments.rejectBy('isNew');
    const commentCount = savedComments.get('length');
    const ratings = savedComments.mapBy('rating');
    const totalRating = _.sum(ratings);

    return totalRating / commentCount;
  })
});
