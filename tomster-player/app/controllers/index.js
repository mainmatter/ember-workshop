import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action
  selectAlbum(album) {
    alert(`Selected album "${album.title}"!`);
  }

  @action
  selectSong(song) {
    alert(`Selected song "${song.title}"!`);
  }
}
