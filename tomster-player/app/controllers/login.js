import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject(),

  actions: {
    usernameChanged(event) {
      this.set('username', event.target.value);
    },

    passwordChanged(event) {
      this.set('password', event.target.value);
    },

    async login(event) {
      event.preventDefault();

      try {
        await this.session.authenticate('authenticator:oauth2-password-grant', this.username, this.password);
      } catch(response) {
        let json = await response.clone().json();
        this.set('errorMessage', json.error);
      }
    }
  }
});
