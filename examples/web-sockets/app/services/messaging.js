import Service from "@ember/service";
import Evented from "@ember/object/evented";
import io from "socket.io-client";
import { tracked } from "@glimmer/tracking";

export default class MessagingService extends Service.extend(Evented) {
  @tracked connected = false;

  connect() {
    let socket = io(window.location.origin);
    socket.on("connect", () => (this.connected = true));
    socket.on("disconnect", () => (this.connected = false));
    socket.on("messaging", (data) => this.trigger("received", data));
    this.socket = socket;
  }

  send(text) {
    this.socket.emit("messaging", { text });
  }
}
