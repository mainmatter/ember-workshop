import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  messaging: service(),

  afterModel() {
    this.get('messaging').connect();
  }
});
