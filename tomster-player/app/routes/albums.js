import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AlbumsRoute extends Route {
  @service store;

  async model() {
    let albums = await this.store.findAll('album');
    await Promise.all(albums.map(async (album) => album.get('songs')));

    return albums;
  }
}
