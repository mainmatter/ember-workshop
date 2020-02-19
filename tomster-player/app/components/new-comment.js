import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  rating: validator('presence', true),
  text: validator('presence', true),
});

export default Component.extend(Validations, {
  store: inject(),

  ratingOptions: computed('rating', function() {
    return [
      { value: 1, label: '⭐️' },
      { value: 2, label: '⭐️⭐️' },
      { value: 3, label: '⭐️⭐️⭐️' },
      { value: 4, label: '⭐️⭐️⭐️⭐️' },
      { value: 5, label: '⭐️⭐️⭐️⭐️⭐️' }
    ].map((option) => {
      return {
        ...option,
        selected: option.value === this.rating
      };
    })
  }),

  actions: {
    ratingChanged(event) {
      this.set('rating', Number(event.target.value));
    },

    textChanged(event) {
      this.set('text', event.target.value);
    },

    async createComment(event) {
      event.preventDefault();

      if (this.validations.isValid) {
        let comment = this.store.createRecord('comment', {
          album: this.album,
          text: this.text,
          rating: this.rating
        });
        await comment.save();
        this.setProperties({ rating: null, text: null });
      }
    }
  }
});
