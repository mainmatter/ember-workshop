import EmberRouter from "@ember/routing/router";
import config from "routing/config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route("media", function () {
    this.route("medium", { path: "/:medium_id" });
  });
  this.route("fail");
  this.route("not-found", { path: "*wildcard" });
});
