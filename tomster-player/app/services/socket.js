import Service from '@ember/service';
import io from 'socket.io-client';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";

export default class SockerService extends Service {
  @service store;
  @service session;

  @tracked id;

  connect() {
    this.socket = io.connect(window.location.origin, {
      query: {
        token: this.session.data.authenticated.access_token
      }
    });

    this.socket.on("connect", () => {
      this.id = this.socket.id;
    });
    this.socket.on("disconnect", () => {
      this.id = null;
    });

    this.socket.on('new-comment', (data) => this._pushNewComment(data));
  }

  disconnect() {
    this.socket.disconnect();
  }

  _pushNewComment(response) {
    this.store.pushPayload('comment', response);
  }
}
