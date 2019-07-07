import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let albums = this.modelFor('albums');
    let album = albums.find((album) => album.id === params.album_id);

    return album;
  }
});
