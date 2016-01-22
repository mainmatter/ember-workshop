import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const album = this.get('store').peekRecord('album', params.album_id);

    return album.get('comments').then(() => album);
  }
});
