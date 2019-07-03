import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return Promise.reject('an error occured!');
  },

  actions: {
    error(e) {
      //eslint-disable-next-line no-console
      console.error('Routing error:', e);
    }
  }
});
