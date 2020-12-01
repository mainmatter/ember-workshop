import Model, { attr, belongsTo } from '@ember-data/model';

export default Model.extend({
  title:    attr('string'),
  duration: attr('number'),
  mp3Url:   attr('string'),

  album: belongsTo()
});
