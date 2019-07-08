import Component from '@glimmer/component';

export default class CommentsListComponent extends Component {
  get sortedComments() {
    return this.args.comments
      .filter((c) => !c.isNew)
      .sort((a, b) => a.createdAt > b.createdAt);
  }
}
