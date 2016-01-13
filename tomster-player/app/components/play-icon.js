import Ember from 'ember';

const { inject: { service }, computed } = Ember;

export default Ember.Component.extend({
  tagName: 'span',
  player: service(),

  _songIsCurrentSong: computed('player.song.id', 'song.id', function() {
    const playedSongId = this.get('player.song.id');
    const songId       = this.get('song.id');

    return playedSongId === songId;
  }),

  currentlyPlaying: computed.and('player.playing', '_songIsCurrentSong'),

  actions: {
    play() {
      const { player, song } = this.getProperties('player', 'song');

      player.play(song);
    },

    pause() {
      const player = this.get('player');

      player.pause();
    }
  }
});
