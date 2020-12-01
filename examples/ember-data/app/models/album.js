import Model, { attr, hasMany } from "@ember-data/model";

export default class Album extends Model {
  @attr("string") title;

  @attr("string") coverUrl;

  @hasMany songs;

  @hasMany comments;
}
