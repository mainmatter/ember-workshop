import { and } from '@ember/object/computed';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  player: service(),

  _songIsCurrentSong: computed('player.song.id', 'attrs.song.id', function() {
    const playedSongId = this.get('player.song.id');
    const songId       = this.getAttr('song').get('id');

    return playedSongId === songId;
  }),

  currentlyPlaying: and('player.playing', '_songIsCurrentSong'),

  actions: {
    play() {
      const song = this.getAttr('song');
      const player = this.player;

      player.play(song);
    },

    pause() {
      const player = this.player;

      player.pause();
    }
  }
});
