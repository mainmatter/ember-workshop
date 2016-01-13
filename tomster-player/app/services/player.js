/* global Howl */
import Ember from 'ember';

export default Ember.Service.extend({
  callbacks: ['_onPause', '_onPlay', '_onEnd'],

  play(song) {
    if (song) {
      const sound = this._loadSound(song);
      sound.play();
    }
  },

  pause() {
    const sound = this.get('sound');

    sound.pause();

    this.set('playing', false);
  },

  _loadSound(song) {
    let sound;

    if (this._isAlreadyLoaded(song)) {
      sound = this.get('sound');
    } else {
      this._stop();
      sound = this._changeSong(song);
    }

    return sound;
  },

  _stop() {
    const sound = this.get('sound');

    if (sound) {
      sound.stop();
    }
  },

  _changeSong(song) {
    const { _onPause: onPause, _onPlay: onPlay, _onEnd: onEnd } = this.getProperties(this.callbacks);
    const sound = new Howl({
      src: [song.get('mp3Url')],
      html5: true,
      onplay: onPlay.bind(this),
      onpause: onPause.bind(this),
      onend: onEnd.bind(this)
    });

    this.setProperties({ sound, song });

    return sound;
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
