import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  rating:    attr('number'),
  text:      attr('string'),
  createdAt: attr('date'),

  album: belongsTo()
});
