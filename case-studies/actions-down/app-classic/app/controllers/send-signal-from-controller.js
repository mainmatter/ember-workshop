import Controller from '@ember/controller';
import { readOnly } from '@ember/object/computed';
import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';

export const EVENT_COLLAPSE_ALL = 'collapse all';

const EventedObject = EmberObject.extend(Evented);

export default Controller.extend({
  model: null, // Populated by the route, contains people
  people: readOnly('model'), // For clarity

  eventBus: null,

  init() {
    this._super(...arguments);
    this.set('eventBus', EventedObject.create());
  },

	actions: {
		collapseAll() {
      this.get('eventBus').trigger(EVENT_COLLAPSE_ALL);
    },
  },
});
