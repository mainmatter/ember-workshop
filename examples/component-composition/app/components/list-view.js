import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  _items: computed('items.[]', 'selectedItem', function() {
    const items = [];
    const selectedItem = this.get('selectedItem');
    this.get('items').forEach((item) => {
      items.push({
        item,
        isSelected: item === selectedItem
      });
    });
    return items;
  }),

  actions: {
    selectItem(item) {
      this.set('selectedItem', item);
    },

    removeItem(item) {
      this.attrs['on-remove-item'](item);
    }
  }
});
