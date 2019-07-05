import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    selectAlbum(album) {
      alert(`Selected album "${album.title}"!`);
    },
	
    selectSong(song) {
      alert(`Selected song "${song.title}"!`);
    }
  }
});
