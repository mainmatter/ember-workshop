import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  person: null, // Argument
  controller: null, // Argument

  isExpanded: false,
  fullNameLength: null,

  fullName: computed('person.{firstName,lastName', function () {
    const fullName = `${this.person.firstName} ${this.person.lastName}`;

    this.set('fullNameLength', fullName.length); // This is wrong

    return fullName;
  }),

  didInsertElement() {
    this.controller.components.pushObject(this);
  },

  willDestroy() {
    this.controller.components.removeObject(this);
  },

  actions: {
    toggle() {
      this.set('isExpanded', !this.isExpanded);
    },
  },
});
