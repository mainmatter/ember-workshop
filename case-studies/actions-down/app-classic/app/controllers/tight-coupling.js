import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  model: null, // Populated by the route, contains people
  people: readOnly('model'), // For clarity

  components: [],

  areAllComponentsCollapsed: computed('components.@each.isExpanded', function () {
    return !this.components.some(c => c.get('isExpanded'));
  }),

	actions: {
		collapseAll() {
      this.components.forEach((component) => {
        component.set('isExpanded', false);
      });
    },
  },
});
