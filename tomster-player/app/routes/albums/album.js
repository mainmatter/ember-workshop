import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AlbumRoute extends Route {
  @service store;

  model(params) {
    return this.store.peekRecord('album', params.album_id);
  }
}
