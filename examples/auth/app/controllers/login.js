import { action } from "@ember/object";
import { inject } from "@ember/service";
import Controller from "@ember/controller";

export default class LoginController extends Controller {
  @inject()
  session;

  @action
  authenticate(event) {
    event.preventDefault();

    this.session
      .authenticate("authenticator:oauth2", this.identification, this.password)
      .catch((reason) => {
        this.set("errorMessage", reason.error || reason);
      });
  }
}
