import Ember from 'ember';
import _ from 'lodash/lodash';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { RSVP, inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  commentUpdates: service(),

  model() {
    return this.get('store').findAll('album').then((albums) => {
      const relationPromises = _.union(
        albums.invoke('get', 'songs'),
        albums.invoke('get', 'comments')
      );

      return RSVP.all(relationPromises).then(() => albums);
    });
  },

  afterModel() {
    this.get('commentUpdates').connect();
  }
});