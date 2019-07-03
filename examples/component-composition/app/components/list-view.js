import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  displayItems: computed('items.[]', 'selectedItem', function() {
    return this.items.map((item) => {
      return {
        item,
        isSelected: item === this.selectedItem
      };
    });
  }),

  actions: {
    selectItem(item) {
      this.set('selectedItem', item);
    },

    removeItem(item) {
      this.onRemoveItem(item);
    }
  }
});
