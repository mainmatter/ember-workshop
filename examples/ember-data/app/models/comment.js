import Model, { attr, belongsTo } from "@ember-data/model";

export default class Comment extends Model {
  @attr("number") rating;

  @attr("string") text;

  @attr("date") createdAt;

  @belongsTo album;
}
