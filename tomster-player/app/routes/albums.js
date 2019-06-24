import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import _ from 'lodash';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  commentUpdates: service(),

  model() {
    return this.store.findAll('album').then((albums) => {
      const relationPromises = _.flatten([
        albums.getEach('songs'),
        albums.getEach('comments')
      ]);

      return RSVP.all(relationPromises).then(() => albums);
    });
  },

  afterModel() {
    this.commentUpdates.connect();
  }
});
