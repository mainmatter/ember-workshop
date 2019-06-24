import { formatDatetime } from '../../../helpers/format-datetime';
import { module, test } from 'qunit';

module('Unit | Helper | format datetime', function() {
  test('returns null when no datetime is specified', function(assert) {
    const result = formatDatetime();

    assert.equal(result, null);
  });

  test('returns the locale string of the passed datetime', function(assert) {
    const datetime = new Date();
    const result = formatDatetime(datetime);

    assert.equal(result, datetime.toLocaleString());
  });
});
