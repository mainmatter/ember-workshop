import { formatDuration } from '../../../helpers/format-duration';
import { module, test } from 'qunit';

module('Unit | Helper | format duration');

test('formats a duration in milliseconds as "minutes:seconds"', function(assert) {
  let result = formatDuration(4230000);

  assert.equal(result, '70:30');
});

test('inserts leading zeroes for short durations', function(assert) {
  let result = formatDuration(5000);

  assert.equal(result, '00:05');
});
