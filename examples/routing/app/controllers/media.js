import { computed } from "@ember/object";
import { equal } from "@ember/object/computed";
import Controller from "@ember/controller";

export default class MediaController extends Controller {
  queryParams = ["filter"];
  filter = "albums";

  @equal("filter", "albums")
  showAlbums;

  @equal("filter", "movies")
  showMovies;

  @computed("showAlbums", "showMovies")
  get media() {
    if (this.showAlbums) {
      return this.model.albums;
    } else if (this.showMovies) {
      return this.model.movies;
    } else {
      return [];
    }
  }
}
