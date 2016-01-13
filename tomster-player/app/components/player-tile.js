import Ember from 'ember';

const {inject, computed} = Ember;
const {readOnly}         = computed;
const {service}          = inject;

export default Ember.Component.extend({
  player: service(),

  playing: readOnly('player.playing'),
  song: readOnly('player.song')
});
