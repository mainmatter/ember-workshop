import { action } from "@ember/object";
import { inject } from "@ember/service";
import Controller from "@ember/controller";

export default class ApplicationController extends Controller {
  @inject()
  session;

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
