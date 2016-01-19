import Ember from 'ember';

export function formatDatetime(datetime) {
  return datetime.toLocaleDateString();
}

export default Ember.Helper.helper(formatDatetime);
