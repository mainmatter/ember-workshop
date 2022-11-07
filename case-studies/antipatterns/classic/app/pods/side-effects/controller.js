import Controller from "@ember/controller";
import { computed } from "@ember/object";

export default Controller.extend({
  firstName: "John",
  lastName: "Doe",

  fullNameLength: null,

  fullName: computed("firstName", "lastName", function () {
    const fullName = `${this.get("firstName")} ${this.get("lastName")}`;

    this.set("fullNameLength", fullName.length); //

    return fullName;
  }),

  actions: {
    change(property, event) {
      this.set(property, event.target.value);
    },
  },
});
