import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PlayerTileComponent extends Component {
  @service player;

  get song() {
    return this.player.song;
  }
}
