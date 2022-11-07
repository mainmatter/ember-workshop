import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';

const Person = EmberObject.extend({
  _name: null,

  name: computed('_name', {
    get: function () {
      return this.get('_name').toUpperCase();
    },}),

  setName(value){
    this.set("_name", value)
  }
});

export default Controller.extend({
  person: null,

  init() {
    const person =  Person.create();
    person.setName("hagar");
    this.set('person', person);
  },

  actions: {
    setName(event) {
      this.get('person').setName(event.target.value);
    },
  },
});
