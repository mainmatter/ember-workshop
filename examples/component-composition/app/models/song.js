import Model from "ember-data/model";
import attr from "ember-data/attr";

export default class Song extends Model {
  @attr("string")
  name;

  @attr("string")
  coverUrl;

  @attr("number", { defaultValue: 0 })
  rating;
}
