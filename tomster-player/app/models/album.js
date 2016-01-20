import Ember from 'ember';
import DS from 'ember-data';
import _ from 'lodash/lodash';

const { computed } = Ember;
const { attr, hasMany } = DS;

export default DS.Model.extend({
  title:    attr('string'),
  coverUrl: attr('string'),

  songs: hasMany(),
  comments: hasMany(),

  averageRating: computed('comments.@each.rating', 'comments.@each.isNew', function() {
    const savedComments = this.get('comments').rejectBy('isNew');
    const commentCount = savedComments.get('length');
    const ratings = savedComments.mapBy('rating');
    const totalRating = _.sum(ratings);

    return totalRating / commentCount;
  })
});
