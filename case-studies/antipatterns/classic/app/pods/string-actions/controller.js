import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  actions: {
    alert(value) {
      alert(value);
    }
  },
});
