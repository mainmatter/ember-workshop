import Ember from 'ember';

export default Ember.Service.extend({
  play(song) {
    if (song) {
      const sound = this.load(song);
      sound.play();
    }
  },

  load(song) {
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
    if (sound) { sound.stop(); }
  },

  changeSong(song) {
    const {onPause, onPlay, onLoad, onEnd} = this.getProperties(this.callbacks);
    const sound = new Howl({
      src: [song.get('mp3Url')],
      html5: true,
      onload: onLoad.bind(this),
      onplay: onPlay.bind(this),
      onpause: onPause.bind(this),
      onend: onEnd.bind(this)
    });

    this.setProperties({
      sound: sound,
      song: song
    });

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

  callbacks: ['onPause', 'onPlay', 'onLoad', 'onEnd'],

  onPause() {
    this.setProperties({
      paused: true,
      playing: false,
    });
  },

  onPlay() {
    this.setProperties({
      paused: false,
      playing: true
    });
  },

  onLoad() {
    this.set('loading', false);
  },

  onEnd() {
    this.set('playing', false);
  }
});
