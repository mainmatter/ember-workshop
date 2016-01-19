import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  queryParams: ['filter'],
  filter: 'albums',

  showAlbums: computed.equal('filter', 'albums'),
  showMovies: computed.equal('filter', 'movies'),

  media: computed('showAlbums', 'showMovies', function() {
    const { showAlbums, showMovies, model } = this.getProperties('showAlbums', 'showMovies', 'model');

    if (showAlbums) {
      return model.albums;
    } else if (showMovies) {
      return model.movies;
    } else {
      return [];
    }
  })
});
