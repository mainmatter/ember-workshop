import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  player: service(),

  playing: readOnly('player.playing'),
  song: readOnly('player.song')
});
