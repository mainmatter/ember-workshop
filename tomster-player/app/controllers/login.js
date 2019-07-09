import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @service session;

  @tracked username = null;
  @tracked password = null;
  @tracked errorMessage = null;

  @action
  usernameChanged(event) {
    this.username = event.target.value;
  }

  @action
  passwordChanged(event) {
    this.password = event.target.value;
  }

  @action
  async login(event) {
    event.preventDefault();

    try {
      await this.session.authenticate(
        'authenticator:oauth2-password-grant',
        this.username,
        this.password
      );
    } catch (response) {
      let json = await response.clone().json();
      this.errorMessage = json.error;
    }
  }
}
