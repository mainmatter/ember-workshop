import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    const album = this.get('store').peekRecord('album', params.album_id);

    return album.get('comments').then(() => album);
  }
});
