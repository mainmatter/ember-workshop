import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    handleLegacyAction() {
      alert('Handled the legacy action in the route!');
    }
  }
});
