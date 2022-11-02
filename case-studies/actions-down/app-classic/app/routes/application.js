import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
      { firstName: 'Kermit', lastName: 'Frog' },
      { firstName: 'Miss', lastName: 'Piggy' },
      { firstName: 'Cookie', lastName: 'Monster' },
    ]
  }
});
