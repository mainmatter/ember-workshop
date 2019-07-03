import Controller from '@ember/controller';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  songCount: reads('model.length'),

  actions: {
    deleteSong(song) {
      song.destroyRecord();
    }
  }
});
