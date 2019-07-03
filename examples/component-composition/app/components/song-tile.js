import Component from '@ember/component';

export default Component.extend({
  doubleClick() {
    this.onSelectSong(this.song);
  }
});
