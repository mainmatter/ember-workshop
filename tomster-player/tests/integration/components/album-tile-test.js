import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('album-tile', 'Integration | Component | album tile', {
  integration: true,

  beforeEach() {
    this.inject.service('store');
    const album = Ember.Object.create({
      title: 'Whitney Houston',
      coverUrl: 'http://example.com/cover.jpg',
      songs: [
        Ember.Object.create({ id: 1 }),
        Ember.Object.create({ id: 2 })
      ]
    });
    this.set('album', album);
  }
});

test('renders the album title', function(assert) {
  this.render(hbs`{{album-tile album=album}}`);

  assert.equal(this.$('h4').text().trim(), 'Whitney Houston');
});

test("renders the album's songs", function(assert) {
  this.render(hbs`{{album-tile album=album}}`);

  assert.equal(this.$('ol li').length, 2);
});

test("renders the album's cover", function(assert) {
  this.render(hbs`{{album-tile album=album}}`);

  assert.equal(this.$('img[src="http://example.com/cover.jpg"]').length, 1);
});

test('renders a rating indicator', function(assert) {
  this.render(hbs`{{album-tile album=album}}`);

  assert.equal(this.$('.fa.fa-star').length, 5);
});

test('calls the action assigned to on-select-album with the album when clicked', function(assert) {
  this.on('selectAlbum', (value) => {
    const album = this.get('album');

    assert.deepEqual(value, album);
  });

  this.render(hbs`{{album-tile album=album on-select-album=(action 'selectAlbum') id='the-component'}}`);

  this.$('#the-component').click();
});

test('does not require an action to be assigned to the on-select-album event', function(assert) {
  assert.expect(0);

  this.render(hbs`{{album-tile album=album id='the-component'}}`);

  this.$('#the-component').click();
});
