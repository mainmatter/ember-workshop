import Controller from '@ember/controller';

export default Controller.extend({
  processName(name) {
    return name.split('').reverse().join('');
  },
});
