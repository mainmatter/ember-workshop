import { action } from "@ember/object";
import { reads } from "@ember/object/computed";
import Controller from "@ember/controller";

export default class SongsController extends Controller {
  @reads("model.length")
  songCount;

  @action
  deleteSong(song) {
    song.destroyRecord();
  }
}
