import Model, { attr, hasMany } from '@ember-data/model';

export default class Album extends Model {
  @attr title;
  @attr coverUrl;

  @hasMany songs;
}
