import Component from '@ember/component';
import _ from 'lodash';

export default Component.extend({
  didReceiveAttrs() {
    const comments = this.getAttr('comments').rejectBy('isNew').toArray();
    const sortedComments = _.sortBy(comments, (comment) => comment.get('createdAt')).reverse();
    
    this.set('sortedComments', sortedComments);
  }
});
