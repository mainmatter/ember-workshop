import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  displayOptions: computed('value', 'options.[]', function() {
    return this.options.map((option) => {
      return {
        label: option,
        value: option,
        isSelected: String(this.value) === String(option)
      }
    });
  }),

  actions: {
    onSelectionChange(event) {
      let { value } = event.target;

      this.onChange(value);
    }
  }
});
