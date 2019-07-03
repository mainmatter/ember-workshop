import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);

    this.ratingOptions = ['1', '2', '3', '4', '5'];
  }
});
