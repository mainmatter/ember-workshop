import Ember from 'ember';

export function formatDatetime([datetime]) {
  if (datetime) {
    return datetime.toLocaleString();
  }
}

export default Ember.Helper.helper(formatDatetime);
