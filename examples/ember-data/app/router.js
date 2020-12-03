import EmberRouter from "@ember/routing/router";
import config from "ember-data/config/environment"; // eslint-disable-line ember/use-ember-data-rfc-395-imports

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {});
