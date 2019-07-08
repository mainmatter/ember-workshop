import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Component.extend({
  tagName: '',
  player: inject(),

  isPlaying: computed('player.{isPlaying,song}', function() {
    return this.player.isPlaying && this.player.song === this.song;
  }),

  actions: {
    play() {
      this.player.play(this.song);
    },

    stop() {
      this.player.stop();
    }
  }
});
