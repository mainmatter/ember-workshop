import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SongsController extends Controller {
  @tracked rating = null;

  get songCount() {
    return this.model.length;
  }

  get orderedSongs() {
    return this.model.toArray().sort((a, b) => b.rating - a.rating);
  }

  @action
  setSongRating(song, rating) {
    song.rating = Number(rating);
  }
}
