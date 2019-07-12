import Service from '@ember/service';
import io from 'socket.io-client';
import { inject } from '@ember/service';
import config from '../config/environment';

export default Service.extend({
  store: inject(),
  session: inject(),

  connect() {
    this.socket = io.connect(config.sockets.host, {
      query: {
        token: this.session.data.authenticated.access_token
      }
    });
    this.socket.on('comments:broadcast', (data) => this._pushNewComment(data));
  },

  disconnect() {
    this.socket.disconnect();
  },

  _pushNewComment(data) {
    this.store.pushPayload('comment', data);
  }
});
