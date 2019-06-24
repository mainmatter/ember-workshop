import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
  didReceiveAttrs() {
    const comments = this.getAttr('comments').rejectBy('isNew').toArray();
    const sortedComments = _.sortBy(comments, (comment) => comment.get('createdAt')).reverse();
    
    this.set('sortedComments', sortedComments);
  }
});
