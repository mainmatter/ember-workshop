import Ember from 'ember';

const {inject, computed} = Ember;
const {readOnly}         = computed;
const {service}          = inject;

export default Ember.Component.extend({
  player: service(),

  playing: readOnly('player.playing'),
  song: readOnly('player.song'),

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
