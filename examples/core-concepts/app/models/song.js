import Model from '@ember-data/model';
import { attr } from '@ember-data/model';

export default class Song extends Model {
  @attr name;
  @attr coverUrl;
}
