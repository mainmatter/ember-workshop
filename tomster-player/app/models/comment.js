import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  rating:    attr('number'),
  text:      attr('string'),
  createdAt: attr('date'),

  album: belongsTo()
});
