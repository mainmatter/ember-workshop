import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { RSVP } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.get('store').findRecord('album', params.album_id).then((album) => {
      return RSVP.all([
        album.get('comments'),
        album.get('songs')
      ]).then(() => album);
    });
  }
});
