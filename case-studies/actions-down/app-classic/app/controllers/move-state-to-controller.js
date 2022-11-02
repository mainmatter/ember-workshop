import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import EmberObject from '@ember/object';

export default Controller.extend({
  model: null, // Populated by the route, contains people
  people: readOnly('model'), // For clarity

  peopleWrapped: computed('people.[]', function() {
    return this.get('people').map((person) => {
      return EmberObject.create({ person, isExpanded: false });
    });
  }),

  areAllComponentsCollapsed: computed('peopleWrapped.@each.isExpanded', function () {
    return !this.get('peopleWrapped').some(c => c.get('isExpanded'));
  }),

	actions: {
		collapseAll() {
      this.get('peopleWrapped').forEach((wrapper) => {
        wrapper.set('isExpanded', false);
      });
    },
    toggle(wrapper) {
      wrapper.set('isExpanded', !wrapper.get('isExpanded'));
    }
  },
});
