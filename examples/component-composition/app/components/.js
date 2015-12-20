import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this.$('.rating').barrating({
      theme: 'css-stars',
      onSelect: (value) => {
        this.attrs['on-rating-change'](value);
      }
    });
  },

  willDestroyElement() {
    this.$('.rating').barrating('destroy');
  }
});
