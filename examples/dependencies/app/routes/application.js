import Route from "@ember/routing/route";
import { hash } from "rsvp";

export default class ApplicationRoute extends Route {
  model() {
    return hash({
      highcharts: import("highcharts").then((module) => module.default),
    });
  }
}
