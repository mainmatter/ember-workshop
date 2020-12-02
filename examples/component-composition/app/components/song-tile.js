import Component from "@ember/component";

export default class SongTile extends Component {
  doubleClick() {
    this.onSelectSong(this.song);
  }
}
