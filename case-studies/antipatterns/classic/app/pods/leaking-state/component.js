import Component from "@ember/component";
import hbs from "htmlbars-inline-precompile";
import EmberObject from "@ember/object";

export default Component.extend({
  // Component's tempalte is defined here to make exercise navigation easier.
  // This approach is OK for Ember integration tests, but don't use it in real life.
  init() {
    this._super(...arguments);
    this.droid = EmberObject.create({
      name: "R2D2",
    });
  },

  layout: hbs`
    Droid name:

    <input
      value={{this.droid.name}}
      oninput={{action "setName"}}
    />
  `,

  tagName: "label",

  actions: {
    setName(event) {
      this.set("droid.name", event.target.value);
    },
  },
});
