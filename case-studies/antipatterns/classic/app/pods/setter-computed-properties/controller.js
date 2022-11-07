import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';

const Person = EmberObject.extend({
  _name: null,

  name: computed('_name', {
    get: function () {
      return this.get('_name').toUpperCase();
    },

    set: function (_key, nameUpperCase) {
      this.set('_name', nameUpperCase.toLowerCase());
      return nameUpperCase;
    },
  }),
});

export default Controller.extend({
  person: null,

  init() {
    this.set('person', Person.create({ name: 'JOHN DOE'}));
  },

  actions: {
    setName(event) {
      this.set('person.name', event.target.value.toUpperCase());
    },
  },
});
