import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    handleLegacyAction() {
      alert('Handled the legacy action in the route!');
    }
  }
});
