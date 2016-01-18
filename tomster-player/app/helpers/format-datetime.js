import Ember from 'ember';

export function formatDatetime(datetime) {
  debugger;
  return datetime.toLocaleDateString();
}

export default Ember.Helper.helper(formatDatetime);
