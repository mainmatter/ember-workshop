import Route from '@ember/routing/route';
import EmberObject, { computed, observer } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';

const DebugMixin = Mixin.create({
  debug() {
    //eslint-disable-next-line no-console
    console.log(`The instance says: ${this.debugInfo}`);
  }
});

const Song = EmberObject.extend({
  init() {
    this._super(...arguments);

    this.comments = A();
  },

  fullTitle: computed('title', 'album', 'artist', {
    get() {
      return `${this.artist}: ${this.title} - ${this.album}`;
    },
    set(key, value) {
      const [artist, title, album] = value.split(/[:-]/).map(element => element.trim());

      this.setProperties({
        artist, title, album
      });

      return value;
    }
  }),

  isGreat: computed('comments.[]', function() {
    return this.comments.length >= 3;
  }),

  play() {
    //eslint-disable-next-line no-console
    console.log('🎤🎹🎷🎺🎸🎻');
  },

  //eslint-disable-next-line ember/no-observers
  _isGreatChanged: observer('isGreat', function() {
    if (this.isGreat) {
      //eslint-disable-next-line no-console
      console.log(`"${this.title}" is great!`);
    }
  })
});

const DebugSong = Song.extend(DebugMixin, {
  debugInfo: 'I am an instance of the Song class.',
  
  play() {
    //eslint-disable-next-line no-console
    console.log(`playing "${this.title}"…`);

    this._super(...arguments);

    //eslint-disable-next-line no-console
    console.log(`finished playing "${this.title}"…`);
  }
});

const Album = EmberObject.extend({
  init() {
    this._super(...arguments);

    this.songs = A();
  },

  songTitles: computed('songs.@each.title', function() {
    return this.songs.map((song) => song.title);
  })
});

export default Route.extend({
  beforeModel() {
    // make classes globally available so we can play around with them in the console
    window.Song      = Song;
    window.DebugSong = DebugSong;
    window.Album     = Album;
  }
});
