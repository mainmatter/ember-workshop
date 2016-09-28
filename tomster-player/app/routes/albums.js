import Ember from 'ember';
import _ from 'lodash/lodash';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { RSVP } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').findAll('album').then((albums) => {
      const relationPromises = _.flatten([
        albums.getEach('songs'),
        albums.getEach('comments')
      ]);

      return RSVP.all(relationPromises).then(() => albums);
    });
  }
});
