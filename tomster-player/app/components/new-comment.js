import Ember from 'ember';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Component.extend({
  store: service(),

  actions: {
    createComment() {
      const { store, text, album } = this.getProperties('store', 'text', 'album');

      if (!isEmpty(text)) {
        store.createRecord('comment', { text, album }).save();
      };
    },

    textChanged(event) {
      this.set('text', event.target.value);
    }
  }
});
