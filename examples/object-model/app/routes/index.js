import Ember from 'ember';

const { observer, computed } = Ember;

const DebugMixin = Ember.Mixin.create({
  debug() {
    const debugInfo = this.get('debugInfo');
    console.log(`The instance says: ${debugInfo}`);
  }
});

const Song = Ember.Object.extend(DebugMixin, {
  debugInfo: 'I am an instance of the Song class.',

  init() {
    this._super(...arguments);
    const comments = Ember.A();
    this.set('comments', comments);
  },

  fullTitle: computed('title', 'album', 'artist', {
    get() {
      const { title, album, artist } = this.getProperties(
        'title', 'album', 'artist'
      );

      return `${artist}: ${title} - ${album}`;
    },
    set(key, value) {
      const [artist, title, album] = value.split(/[:-]/);

      this.setProperties({
        artist, title, album
      });
    }
  }),

  isGreat: computed('comments.[]', function() {
    const comments = this.get('comments');

    return comments.length >= 3;
  }),

  play() {
    console.log('🎤🎹🎷🎺🎸🎻');
  },

  _isGreatChanged: observer('isGreat', function() {
    const { isGreat, title } = this.getProperties('isGreat', 'title');

    if (isGreat) {
      console.log(`"${title}" is great!`);
    }
  })
});

const DebugSong = Song.extend({
  play() {
    const title = this.get('title');
    console.log(`playing "${title}"…`);
    this._super(...arguments);
    console.log(`finished playing "${title}"…`);
  }
});

const Album = Ember.Object.extend({
  init() {
    this._super(...arguments);
    const songs = Ember.A();
    this.set('songs', songs);
  },

  songTitles: computed('songs.@each.title', function() {
    return this.get('songs').map((song) => {
      return song.get('title');
    });
  })
});

export default Ember.Route.extend({
  beforeModel() {
    window.Song      = Song;
    window.DebugSong = DebugSong;
    window.Album     = Album;
  }
});
