import Service from '@ember/service';
import io from 'socket.io-client';
import { inject as service } from '@ember/service';

export default class SockerService extends Service {
  @service store;
  @service session;

  connect() {
    this.socket = io.connect('http://localhost:3000', {
      query: {
        token: this.session.data.authenticated.access_token
      }
    });
    this.socket.on('comments:broadcast', (data) => this._pushNewComment(data));
  }

  disconnect() {
    this.socket.disconnect();
  }

  _pushNewComment(response) {
    this.store.pushPayload('comment', response);
  }
}
