import { action } from "@ember/object";
import { inject } from "@ember/service";
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @inject()
  session;
  @tracked errorMessage = null;

  @action
  authenticate(event) {
    event.preventDefault();

    this.session
      .authenticate("authenticator:oauth2", this.identification, this.password)
      .catch((reason) => {
        this.errorMessage = reason.error || reason;
      });
  }
}
