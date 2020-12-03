import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ListView extends Component {
  @tracked selectedItem;

  get displayItems() {
    return this.args.items.map((item) => {
      return {
        item,
        isSelected: item === this.selectedItem,
      };
    });
  }

  @action
  selectItem(item) {
    this.selectedItem = item;
  }

  @action
  removeItem(item) {
    this.args.onRemoveItem(item);
  }
}
