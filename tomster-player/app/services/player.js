/* global Howl, localStorage */
import Service, { inject as service } from '@ember/service';

import { computed } from '@ember/object';

export const CURRENT_SONG_KEY_NAME = '_tomsterPlayerCurrentSong';

let callbacks = ['_onPause', '_onPlay', '_onEnd'];

export default Service.extend({
  store: service(),
  callbacks,

  init() {
    this._super();
    this._restoreCurrentSong();
  },

  play(song) {
    this._stop();
    this.set('song', song);
    this._persistCurrentSong();
    this.get('sound').play();
  },

  pause() {
    const sound = this.get('sound');

    sound.pause();

    this.set('playing', false);
  },

  sound: computed('song', function() {
    const song = this.get('song');

    if (song) {
      const { _onPause: onPause, _onPlay: onPlay, _onEnd: onEnd } = this.getProperties(this.callbacks);

      const sound = new Howl({
        src: [song.get('mp3Url')],
        html5: true,
        onplay: onPlay.bind(this),
        onpause: onPause.bind(this),
        onend: onEnd.bind(this)
      });

      return sound;
    }
  }),

  _persistCurrentSong() {
    const song = this.get('song');

    if (song) {
      const songId = song.get('id');
      localStorage.setItem(CURRENT_SONG_KEY_NAME, songId);
    }
  },

  _restoreCurrentSong() {
    const songId = localStorage.getItem(CURRENT_SONG_KEY_NAME);

    if (songId) {
      const song = this.get('store').find('song', songId);
      this.set('song', song);
    }
  },

  _stop() {
    const { sound, playing } = this.getProperties('sound', 'playing');

    if (sound && playing) {
      sound.stop();
    }
  },

  _isAlreadyLoaded(song) {
    const loadedSongId = this.get('song.id');

    return loadedSongId === song.get('id');
  },

  _onPause() {
    this.set('playing', false);
  },

  _onPlay() {
    this.set('playing', true);
  },

  _onEnd() {
    this.set('playing', false);
  }
});
