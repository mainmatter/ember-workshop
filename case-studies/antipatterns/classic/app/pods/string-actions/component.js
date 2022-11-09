import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  // Component's tempalte is defined here to make exercise navigation easier.
  // This approach is OK for Ember integration tests, but don't use it in real life.
  layout: hbs`
    <button
      {{action "one"}}
    >
      One
    </button>

    <button
      {{action "two"}}
    >
      Two
    </button>
  `,

  actions: {
    alert1: null, // Arg, string that references an action

    one() {
      this.sendAction("alert1", "One");
    },

    two() {
      this.send("three", "Two");
    },

    three(str) {
      this.sendAction("alert1", `${str} and Three`);
    },
  },
});
