/* global io */
import Ember from 'ember';
import { Socket } from 'phoenix';
import config from '../config/environment';

const { inject: { service } } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  store: service(),
  session: service(),

  connect() {
    let socket;
    this.get('session').authorize('authorizer:oauth2-bearer', (_, token) => {
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
    this.get('socket').disconnect();
  },

  _pushNewComment(data) {
    this.get('store').pushPayload('comment', data);
  }
});
