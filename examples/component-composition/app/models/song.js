import Model, { attr } from "@ember-data/model";

export default class Song extends Model {
  @attr("string")
  name;

  @attr("string")
  coverUrl;

  @attr("number", { defaultValue: 0 })
  rating;
}
