import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    this.$('.rating').barrating({
      theme: 'css-stars',
      onSelect: (value) => {
        const onRatingChange = this.attrs['on-rating-change'];

        if (onRatingChange) {
          onRatingChange(value);
        }
      }
    });
  }
});
