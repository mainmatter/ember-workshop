import { action, computed } from "@ember/object";
import Component from "@ember/component";

export default class ListView extends Component {
  @computed("items.[]", "selectedItem")
  get displayItems() {
    return this.items.map((item) => {
      return {
        item,
        isSelected: item === this.selectedItem,
      };
    });
  }

  @action
  selectItem(item) {
    this.set("selectedItem", item);
  }

  @action
  removeItem(item) {
    this.onRemoveItem(item);
  }
}
