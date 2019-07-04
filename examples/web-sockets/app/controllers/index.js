import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  messaging: inject(),

  connected: reads('messaging.connected'),

  init() {
    this._super(...arguments);
    this.set('messages', []);

    this.messaging.on('received', (data) => this.messages.pushObject(data));
  },

  actions: {
    send(e) {
      e.preventDefault();

      this.messaging.send(this.text);
      this.set('text', null);
    }
  }
});
