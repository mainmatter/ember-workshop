import Service, { inject } from '@ember/service';

export const CURRENT_SONG_KEY_NAME = 'CURRENT_SONG';

export default Service.extend({
  store: inject(),

  init() {
    this._super(...arguments);

    this.audio = document.createElement('audio');
    this.source = document.createElement('source');
    this.audio.appendChild(this.source);
    this.audio.addEventListener('ended', () => this.set('isPlaying', false));

    this._restoreCurrentSong();
  },

  play(song) {
    this.setProperties({
      song,
      isPlaying: true
    });
    this._play();
    this._persistCurrentSong();
  },

  stop() {
    this.set('isPlaying', false);
    this._stop();
  },

  _play() {
    this.source.src = this.song.mp3Url;
    this.audio.load();
    this.audio.play();
  },

  _stop() {
    this.audio.pause();
  },

  _persistCurrentSong() {
    window.localStorage.setItem(CURRENT_SONG_KEY_NAME, this.song.id);
  },
	
  _restoreCurrentSong() {
    let songId = localStorage.getItem(CURRENT_SONG_KEY_NAME);
	
    if (songId) {
      let song = this.store.findRecord('song', songId);
      this.set('song', song);
    }
  },
});
