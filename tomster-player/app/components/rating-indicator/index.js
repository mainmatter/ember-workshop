import Component from '@glimmer/component';

export default class extends Component {
  get activeStars() {
    let roundedRating = Math.round(this.args.rating);

    return new Array(roundedRating);
  }
}
