import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('album', params.album_id).then((album) => {
      return RSVP.all([
        album.get('comments'),
        album.get('songs')
      ]).then(() => album);
    });
  }
});
