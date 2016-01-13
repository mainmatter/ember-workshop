import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  rating:    attr('number'),
  text:      attr('string'),
  createdAt: attr('date'),

  album: belongsTo()
});
