import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NewCommentComponent extends Component {
  @service store;

  @tracked rating = null;
  @tracked text = null;

  get submitDisabled() {
    return !this.rating || !this.text;
  }

  get ratingOptions() {
    return [
      { value: 1, label: '⭐️' },
      { value: 2, label: '⭐️⭐️' },
      { value: 3, label: '⭐️⭐️⭐️' },
      { value: 4, label: '⭐️⭐️⭐️⭐️' },
      { value: 5, label: '⭐️⭐️⭐️⭐️⭐️' },
    ].map((option) => {
      return {
        ...option,
        selected: option.value === this.rating,
      };
    });
  }

  @action
  ratingChanged(event) {
    this.rating = Number(event.target.value);
  }

  @action
  textChanged(event) {
    this.text = event.target.value;
  }

  @action
  async createComment(event) {
    event.preventDefault();

    let comment = this.store.createRecord('comment', {
      album: this.args.album,
      text: this.text,
      rating: this.rating,
    });
    await comment.save();
    this.rating = null;
    this.text = null;
  }
}
