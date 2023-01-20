import Model, { attr } from '@ember-data/model';

export default class Song extends Model {
  @attr name;
  @attr coverUrl;
  @attr({ defaultValue: 0 }) rating;
}
