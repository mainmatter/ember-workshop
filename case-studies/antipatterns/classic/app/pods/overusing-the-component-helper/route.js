import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [
      { componentName: 'image', src: "/surprised_pikachu.jpg", width: 100},
      { componentName: 'person', name: 'Pikachu', types: ['Electric']},
      { componentName: 'toggle'},
    ].map((el => {
      el.componentName = 'overusing-the-component-helper' + '/' + el.componentName;
      return el;
    }));
  }
});
