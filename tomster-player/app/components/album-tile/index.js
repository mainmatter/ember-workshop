import Component from '@glimmer/component';

export default class AlbumTileComponent extends Component {
  get rating() {
    let ratings = this.args.album.comments
      .filter((c) => !c.isNew)
      .map((c) => c.rating);
    let totalRating = ratings.reduce((acc, r) => acc + r, 0);

    return ratings.length > 0 ? totalRating / ratings.length : 0;
  }
}
