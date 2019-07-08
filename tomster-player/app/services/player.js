import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'tomster-player/config/environment';

export const CURRENT_SONG_KEY_NAME = 'CURRENT_SONG';

export default class PlayerService extends Service {
  @service store;

  @tracked isPlaying;
  @tracked song;

  constructor() {
    super(...arguments);

    this.audio = document.createElement('audio');
    this.source = document.createElement('source');
    this.audio.appendChild(this.source);
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });

    if (ENV.environment !== 'test') {
      this._restoreCurrentSong();
    }
  }

  play(song) {
    this.song = song;
    this.isPlaying = true;
    this._play();
    this._persistCurrentSong();
  }

  stop() {
    this.isPlaying = false;
    this._stop();
  }

  _play() {
    this.source.src = this.song.mp3Url;
    this.audio.load();
    this.audio.play();
  }

  _stop() {
    this.audio.pause();
  }

  _persistCurrentSong() {
    window.localStorage.setItem(CURRENT_SONG_KEY_NAME, this.song.id);
  }

  async _restoreCurrentSong() {
    let songId = localStorage.getItem(CURRENT_SONG_KEY_NAME);

    if (songId) {
      let song = await this.store.findRecord('song', songId);
      this.song = song;
    }
  }
}
