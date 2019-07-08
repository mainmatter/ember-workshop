import Route from '@ember/routing/route';

export default class AlbumRoute extends Route {
  model(params) {
    return this.store.peekRecord('album', params.album_id);
  }
}
