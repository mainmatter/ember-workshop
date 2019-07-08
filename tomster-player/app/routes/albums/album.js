import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.peekRecord('album', params.album_id);
  }
});
