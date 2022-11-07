import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  firstName: 'John',
  lastName: 'Doe',

  fullNameLength: computed("fullName", function() {
    return this.get('fullName') || null;
  }),
  fullName: computed('firstName', 'lastName', function () {
    return `${this.get('firstName')} ${this.get('lastName')}`;
  }),

  actions: {
    change(property, event) {
      this.set(property, event.target.value);
    }
  },
});
