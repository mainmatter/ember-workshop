import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default Component.extend({
  // Component's tempalte is defined here to make exercise navigation easier.
  // This approach is OK for Ember integration tests, but don't use it in real life.
  layout: hbs`
    Droid name:

    <input
      value={{this.droid.name}}
      oninput={{action "setName"}}
    />
  `,

  tagName: 'label',
  droid: computed(function () {
    return EmberObject.create({
      name: 'R2D2',
    });
  }),

  actions: {
    setName(event) {
      this.set('droid.name', event.target.value);
    }
  },
});
