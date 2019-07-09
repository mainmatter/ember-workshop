import Session from 'ember-simple-auth/services/session';
import { inject as service } from '@ember/service';

export default class SessionService extends Session {
  @service socket;

  handleAuthentication() {
    super.handleAuthentication(...arguments);

    this.socket.connect();
  }

  handleInvalidation() {
    super.handleInvalidation(...arguments);

    this.socket.disconnect();
  }
}
