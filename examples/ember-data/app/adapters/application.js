import JSONAPIAdapter from "@ember-data/adapter/json-api";

export default class Application extends JSONAPIAdapter {
  namespace = "api";
}
