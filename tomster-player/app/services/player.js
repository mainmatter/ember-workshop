/* global Howl */
import Ember from 'ember';

export default Ember.Service.extend({
  play(song) {
    if (song) {
      const sound = this.loadSound(song);
      sound.play();
    }
  },

  loadSound(song) {
    let sound;

    if (this.alreadyLoaded(song)) {
      sound = this.get('sound');
    } else {
      this.stopCurrent();
      sound = this.changeSong(song);
    }

    return sound;
  },

  stopCurrent() {
    const sound = this.get('sound');

    if (sound) {
      sound.stop();
    }
  },

  changeSong(song) {
    const { onPause, onPlay, onEnd } = this.getProperties(this.callbacks);
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

  alreadyLoaded(song) {
    const loadedSongId = this.get('song.id');

    return loadedSongId === song.get('id');
  },

  pause() {
    const sound = this.get('sound');

    sound.pause();

    this.set('playing', false);
  },

  callbacks: ['onPause', 'onPlay', 'onEnd'],

  onPause() {
    this.set('playing', false);
  },

  onPlay() {
    this.set('playing', true);
  },

  onEnd() {
    this.set('playing', false);
  }
});
