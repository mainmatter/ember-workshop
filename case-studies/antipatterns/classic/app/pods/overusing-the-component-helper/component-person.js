import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  // Component's tempalte is defined here to make exercise navigation easier.
  // This approach is OK for Ember integration tests, but don't use it in real life.
  layout: hbs`
    <p>Name: {{this.name}}</p>
    <p>
      Types:

      <ul>
        {{#each this.types as |type|}}
          <li>{{type}}</li>
        {{/each}}
      </ul>
    </p>
  `,

  name: null, // Arg, string
  types: null, // Arg, array of strings
});
