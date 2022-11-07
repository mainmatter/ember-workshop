import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  // Component's tempalte is defined here to make exercise navigation easier.
  // This approach is OK for Ember integration tests, but don't use it in real life.
  layout: hbs`
    <button
      {{action "randomize"}}
    >
      Randomize
    </button>
  `,

  actions: {
    randomize() {
      this.model.set('number', Math.random());
    }
  }
});
