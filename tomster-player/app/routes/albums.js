import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  async model() {
    let albums = await this.store.findAll('album');
    await RSVP.Promise.all(
      albums.map(async album => album.get('songs'))
    );

    return albums;
  }
});
