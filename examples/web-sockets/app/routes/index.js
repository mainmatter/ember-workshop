import { inject } from "@ember/service";
import Route from "@ember/routing/route";

export default class IndexRoute extends Route {
  @inject()
  messaging;

  afterModel() {
    this.messaging.connect();
  }
}
