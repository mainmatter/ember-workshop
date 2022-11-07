import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  firstName: 'John',
  lastName: 'Doe',

  fullNameLength: computed('fullName', function () {
    const fullName = this.get('fullName');
    return fullName.length;
  }),

  fullName: computed('firstName', 'lastName', function () {
    const fullName = `${this.get('firstName')} ${this.get('lastName')}`;

    return fullName;
  }),

  actions: {
    change(property, event) {
      this.set(property, event.target.value);
    }
  },
});
