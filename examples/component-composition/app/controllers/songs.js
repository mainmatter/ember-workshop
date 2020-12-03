import { action } from "@ember/object";
import Controller from "@ember/controller";

export default class SongsController extends Controller {
  get songCount() {
    return this.model.length;
  }

  @action
  deleteSong(song) {
    song.destroyRecord();
  }
}
