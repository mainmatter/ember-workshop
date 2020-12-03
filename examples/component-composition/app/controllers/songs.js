import Controller from "@ember/controller";

export default class SongsController extends Controller {
  get songCount() {
    return this.model.length;
  }

  deleteSong(song) {
    song.destroyRecord();
  }
}
