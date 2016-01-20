import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  store: service(),

  beforeModel() {
    const store = this.get('store');

    window.store = store;
  }
});
