import Controller from '@ember/controller';
import { observer } from "@ember/object";

export default Controller.extend({
  name: 'John Doe',

  logName: observer('name', function() {
    console.log(this.get('name'));
  }),

  actions: {
    setName(event) {
      this.set('name', event.target.value);
    },
  },
});
