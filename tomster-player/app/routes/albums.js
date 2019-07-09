import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  async model() {
    let albums = await this.store.findAll('album');
    await RSVP.Promise.all([
      ...albums.map(async album => album.get('songs')),
      ...albums.map(async album => album.get('comments'))
    ]);

    return albums;
  }
});
