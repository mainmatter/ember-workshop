import Ember from 'ember';

export default Ember.Controller.extend({
  favoriteWhitneySong: 'The Greatest Love of All',

  whiteneySongs: [
    'The Greatest Love of All',
    'I Will Always Love You',
    'My Love Is Your Love'
  ],

  actions: {
    handleAction() {
      alert('Handled action in the controller!');
    },

    submitForm(e) {
      e.preventDefault();
      alert('Form submitted!');
    },

    textChanged(text) {
      alert(`Text changed to ${text}!`);
    }
  }
});
