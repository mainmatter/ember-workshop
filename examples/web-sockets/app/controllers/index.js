import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class IndexController extends Controller {
  @tracked messages = [];
  @tracked text = null;

  @service messaging;

  constructor() {
    super(...arguments);

    this.messaging.on("received", (data) => {
      this.messages = [...this.messages, data];
    });
  }

  get connected() {
    return this.messaging.connected;
  }

  @action
  send(e) {
    e.preventDefault();

    this.messaging.send(this.text);
    this.text = null;
  }
}
