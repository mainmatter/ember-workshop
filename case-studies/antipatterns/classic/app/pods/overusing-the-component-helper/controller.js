import Controller from '@ember/controller';

export default Controller.extend({
  value: false,

  actions: {
    toggle () {
      this.set('value', !this.get('value'));
    },
  },
});
