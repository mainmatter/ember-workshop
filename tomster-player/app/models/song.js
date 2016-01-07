import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  name:     attr('string'),
  duration: attr('number'),
  mp3Url:   attr('string'),

  album: belongsTo()
});
