import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service('session'),

  actions: {
    invalidateSession() {
      const session = this.get('session');

      session.invalidate();
    }
  }
});
