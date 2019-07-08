import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PlayButtonComponent extends Component {
  @service player;

  get isPlaying() {
    return this.player.isPlaying && this.player.song === this.args.song;
  }

  @action
  play() {
    this.player.play(this.args.song);
  }

  @action
  stop() {
    this.player.stop();
  }
}
