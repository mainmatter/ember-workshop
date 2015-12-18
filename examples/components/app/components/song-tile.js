import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this.$('.rating').barrating({
      theme: 'css-stars'
    });
  }
});
