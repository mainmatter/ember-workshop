import Ember from 'ember';

function rightJustify(string, length, pad) {
  string = string.toString();
  const fill = [];
  while (fill.length + string.length < length) {
    fill[fill.length] = pad;
  }
  return string + fill.join('');
}

export function formatDuration(duration) {
  const durationInSeconds = Math.round(duration / 1000);
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  return `${rightJustify(minutes, 2, '0')}:${rightJustify(seconds, 2, '0')}`;
}

export default Ember.Helper.helper(formatDuration);
