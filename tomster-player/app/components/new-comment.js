import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  ratingOptions: [
    { value: 1, label: '1 - not my favorite'},
    { value: 2, label: "2 - it's ok"},
    { value: 3, label: '3 - nice one'},
    { value: 4, label: '4 - great song'},
    { value: 5, label: '5 - play it all the time!'}
  ],

  actions: {
    createComment(e) {
      e.preventDefault();
      const album = this.getAttr('album');
      const { store, text, rating } = this;

      const comment = store.createRecord('comment', { text, rating, album });
      comment.save().then(() => {
        this.getAttr('on-created')();
      }, () => {
        this.set('errors', comment.get('errors'));
        store.unloadRecord(comment);
      });
    },

    textChanged(event) {
      this.set('text', event.target.value);
    },

    ratingChanged(event) {
      this.set('rating', event.target.value);
    }
  }
});
