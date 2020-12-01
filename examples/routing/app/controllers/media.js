import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";

export default class MediaController extends Controller {
  queryParams = ["filter"];
  @tracked filter = "albums";

  get showAlbums() {
    return this.filter === "albums";
  }

  get showMovies() {
    return this.filter === "movies";
  }

  get media() {
    if (this.showAlbums) {
      return this.model.albums;
    } else if (this.showMovies) {
      return this.model.movies;
    }

    return [];
  }
}
