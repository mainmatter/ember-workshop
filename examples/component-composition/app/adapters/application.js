import JSONAPIAdapter from "ember-data/adapters/json-api";

export default class Application extends JSONAPIAdapter {
  namespace = "api";
}
