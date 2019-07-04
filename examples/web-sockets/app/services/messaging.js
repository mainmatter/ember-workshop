import Service from '@ember/service';
import Evented from '@ember/object/evented'
import io from 'socket.io-client';

export default Service.extend(Evented, {
  connect() {
    let socket = io('ws://localhost:3000');
    socket.on('connect', () => this.set('connected', true));
    socket.on('disconnect', () => this.set('connected', false));
    socket.on('messaging', (data) => this.trigger('received', data));
    this.set('socket', socket);
  },

  send(text) {
    this.socket.emit('messaging', { text });
  }
});
