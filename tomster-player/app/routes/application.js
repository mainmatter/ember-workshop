import Ember from 'ember';
import _ from 'lodash/lodash';

const { RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('album').then((albums) => {
      const relationPromises = _.union(
        albums.invoke('get', 'songs'),
        albums.invoke('get', 'comments')
      );

      return RSVP.all(relationPromises).then(() => albums)
    });
  }
});
