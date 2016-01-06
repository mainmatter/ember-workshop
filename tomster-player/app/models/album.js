import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  name:     attr('string'),
  coverUrl: attr('string'),

  songs: hasMany()
});
