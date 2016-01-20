import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('album').then((albums) => {
      const songPromises = albums.invoke('get', 'songs');
      return RSVP.all(songPromises).then(() => albums)
    });
  }
});
