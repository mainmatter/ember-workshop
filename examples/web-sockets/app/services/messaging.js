/* global io */
import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  connect() {
    let socket = io('ws://localhost:3000');
    socket.on('connect', () => this.set('connected', true));
    socket.on('disconnect', () => this.set('connected', false));
    socket.on('messaging', (data) => this.trigger('received', data));
    this.set('socket', socket);
  },

  send(text) {
    this.get('socket').emit('messaging', { text })
  }
});
