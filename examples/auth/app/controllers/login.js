import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject(),

  actions: {
    authenticate(event) {
      event.preventDefault();

      this.session.authenticate('authenticator:oauth2', this.identification, this.password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
