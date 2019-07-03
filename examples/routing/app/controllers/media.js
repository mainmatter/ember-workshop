import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

export default Controller.extend({
  queryParams: ['filter'],
  filter: 'albums',

  showAlbums: equal('filter', 'albums'),
  showMovies: equal('filter', 'movies'),

  media: computed('showAlbums', 'showMovies', function() {
    if (this.showAlbums) {
      return this.model.albums;
    } else if (this.showMovies) {
      return this.model.movies;
    } else {
      return [];
    }
  })
});
