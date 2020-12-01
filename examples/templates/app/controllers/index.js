import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked
  favoriteWhitneySong = 'The Greatest Love of All';

  whiteneySongs = [
    'The Greatest Love of All',
    'I Will Always Love You',
    'My Love Is Your Love'
  ];

  @action
  handleAction() {
    alert('Handled action in the controller!');
  }

  @action
  submitForm(e) {
    e.preventDefault();

    alert('Form submitted!');
  }

  @action
  updateFavoriteSong(e) {
    let { value } = e.target;
    this.favoriteWhitneySong = value;
  }
}
