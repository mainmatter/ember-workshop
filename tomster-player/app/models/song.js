import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  title:    attr('string'),
  duration: attr('number'),
  mp3Url:   attr('string'),

  album: belongsTo()
});
