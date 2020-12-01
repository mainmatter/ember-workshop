import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  title:    attr('string'),
  coverUrl: attr('string'),

  songs: hasMany(),
  comments: hasMany()
});
