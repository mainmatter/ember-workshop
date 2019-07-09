import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AlbumsRoute extends Route {
  @service session;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    let albums = await this.store.findAll('album');

    await Promise.all([
      ...albums.map(async album => album.get('songs')),
      ...albums.map(async album => album.get('comments'))
    ]);

    return albums;
  }
}
