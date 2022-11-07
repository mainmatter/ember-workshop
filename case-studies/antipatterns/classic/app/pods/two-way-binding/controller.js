import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { readOnly } from "@ember/object/computed";

const Person = EmberObject.extend({
  name: null,
});

export default Controller.extend({
  person: null,

  init() {
    this.set('person', Person.create({ name: 'John Doe'}));
  },

  name: readOnly("person.name"),

  actions: {
    setName(event) {
      this.set("person.name", event.target.value);
    },
  },
});
