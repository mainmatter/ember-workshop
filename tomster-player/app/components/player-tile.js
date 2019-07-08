import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { inject } from '@ember/service';

export default Component.extend({
  player: inject(),

  song: reads('player.song')
});
