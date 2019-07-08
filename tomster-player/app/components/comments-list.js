import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  sortedComments: computed('comments.@each.{isNew,createdAt}', function() {
    return this.comments
      .toArray()
      .filter((c) => !c.isNew)
      .sort((a, b) => a.createdAt > b.createdAt);
  })
});
