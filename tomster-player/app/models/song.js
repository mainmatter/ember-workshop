import Model, { attr, belongsTo } from '@ember-data/model';

export default class Song extends Model {
  @attr title;
  @attr duration;
  @attr mp3Url;

  @belongsTo album;
}
