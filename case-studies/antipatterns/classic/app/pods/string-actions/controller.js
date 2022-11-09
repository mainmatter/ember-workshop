import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  actions: {
    alert1(value) {
      alert(value);
    }
  },
});
