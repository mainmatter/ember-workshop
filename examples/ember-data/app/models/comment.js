import Model, { attr, belongsTo } from "@ember-data/model";

export default class Comment extends Model {
  @attr rating;

  @attr text;

  @attr createdAt;

  @belongsTo album;
}
