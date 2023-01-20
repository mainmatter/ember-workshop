import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SelectBoxComponent extends Component {
  get displayOptions() {
    return this.args.options.map((option) => {
      return {
        label: option,
        value: option,
        isSelected: String(this.args.value) === String(option),
      };
    });
  }

  @action
  changeSelection(event) {
    let { value } = event.target;

    this.args.onChange(value);
  }
}
