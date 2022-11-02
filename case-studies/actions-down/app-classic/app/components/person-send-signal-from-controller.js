import Component from '@ember/component';
import { computed } from '@ember/object';
import { EVENT_COLLAPSE_ALL } from '../controllers/send-signal-from-controller';

export default Component.extend({
  person: null, // Argument
  eventBus: null, // Argument

  isExpanded: false,

  fullName: computed('person.{firstName,lastName', function () {
    return `${this.person.firstName} ${this.person.lastName}`;
  }),

  didInsertElement() {
    this.eventBus.on(EVENT_COLLAPSE_ALL, this, this.actions.collapse);
  },

  willDestroy() {
    this.eventBus.off(EVENT_COLLAPSE_ALL, this, this._collapse);
  },

  actions: {
    toggle() {
      this.set('isExpanded', !this.get('isExpanded'));
    },

    collapse() {
      this.set('isExpanded', false);
    },
  },
});
