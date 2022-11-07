import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default Controller.extend({
  firstName: "John",
  lastName: "Doe",

  fullNameLength: null,

  fullName: computed("firstName", "lastName", function () {
    const fullName = `${this.get("firstName")} ${this.get("lastName")}`;
    return fullName;
  }),

  fullNameLength: computed("fullName", function () {
    if (this.get("fullName")) {
      return this.get("fullName.length");
    } else return null;
  }),

  actions: {
    change(property, event) {
      this.set(property, event.target.value);
    },
  },
});
