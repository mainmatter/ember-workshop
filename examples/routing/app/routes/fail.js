import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.reject('an error occured!');
  },

  actions: {
    error(e) {
      Ember.Logger.error('Routing error:', e);
    }
  }
});
