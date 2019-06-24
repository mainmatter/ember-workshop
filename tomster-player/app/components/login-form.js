import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),

  actions: {
    authenticate(e) {
      e.preventDefault();

      let { username, password } = this;
      this.session.authenticate('authenticator:oauth2-password-grant', username, password).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  }
});
