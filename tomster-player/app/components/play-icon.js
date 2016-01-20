import Ember from 'ember';

const { inject: { service }, computed } = Ember;

export default Ember.Component.extend({
  tagName: 'span',
  player: service(),

  _songIsCurrentSong: computed('player.song.id', 'attrs.song.id', function() {
    const playedSongId = this.get('player.song.id');
    const songId       = this.getAttr('song').get('id');

    return playedSongId === songId;
  }),

  currentlyPlaying: computed.and('player.playing', '_songIsCurrentSong'),

  actions: {
    play() {
      const song = this.getAttr('song');
      const player = this.get('player');

      player.play(song);
    },

    pause() {
      const player = this.get('player');

      player.pause();
    }
  }
});
