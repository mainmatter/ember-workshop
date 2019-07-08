import Route from '@ember/routing/route';

export default class AlbumsRoute extends Route {
  async model() {
    let albums = await this.store.findAll('album');
    await Promise.all(
      albums.map(async album => album.get('songs'))
    );

    return albums;
  }
}
