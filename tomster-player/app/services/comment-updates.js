/* global io */
import Evented from '@ember/object/evented';

import Service, { inject as service } from '@ember/service';
import { Socket } from 'ember-phoenix';
import config from '../config/environment';

export default Service.extend(Evented, {
  store: service(),
  session: service(),

  connect() {
    let socket;
    this.session.authorize('authorizer:oauth2-bearer', (_, token) => {
      if (config.phoenixSocket) {
        socket = new Socket(config.socketHost);
        socket.connect();
        const channel = socket.channel('comments:broadcast', { token });
        channel.join();
        channel.on('new_comment', (data) => this._pushNewComment(data));
      } else {
        socket = io.connect(config.socketHost, { query: { token } });
        socket.on('comments:broadcast', (data) => this._pushNewComment(data));
      }
    });
    this.set('socket', socket);
  },

  disconnect() {
    this.socket.disconnect();
  },

  _pushNewComment(data) {
    this.store.pushPayload('comment', data);
  }
});
