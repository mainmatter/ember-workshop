import Model, { attr, belongsTo } from '@ember-data/model';

export default class Comment extends Model {
  @attr('number') rating;
  @attr('string') text;
  @attr('number') rating;
  @attr('date') createdAt;

  @belongsTo album;
}
