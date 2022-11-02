import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  person: null, // Argument, { firstName: string, lastName: string }
  isExpanded: null, // Argument, boolean
  toggle: null, // Argument, action

  fullName: computed('person.{firstName,lastName', function () {
    return `${this.person.firstName} ${this.person.lastName}`;
  }),
});
