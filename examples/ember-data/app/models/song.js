import Model, { attr, belongsTo } from "@ember-data/model";

export default class Song extends Model {
  @attr("string") title;

  @attr("number") duration;

  @attr("string") mp3Url;

  @belongsTo album;
}
