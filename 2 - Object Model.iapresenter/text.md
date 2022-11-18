# Ember.js Object Model

/assets/About-blend.png
background: true

---

/assets/MainMatter-logo-Negative.svg
size: contain

	https://mainmatter.com
	@mainmatter

/assets/About-blend.png
background: true


---

	Ember.js implements a binding system by means of its own class system and Computed Properties

---

## The class system

---

	`EmberObject` is at the root of the Ember.js class system

---

### Defining new classes
	by extending one of the predefined classes of Ember.js

---

```js
import EmberObject from '@ember/object';

const Song = EmberObject.extend();
```

---

	methods and properties for the new class are defined in the hash(es) passed to `extend()`

---

```js
import EmberObject from '@ember/object';

const Song = EmberObject.extend({
  debugInfo: 'I am an instance of the Song class.',

  play() {
    console.log('🎤🎹🎷🎺🎸🎻');
  }
});
```

---

	methods can be overridden and also call their parent class' implementation

---

```js
const DebugSong = Song.extend({
  play() {
    console.log(`playing “${this.title}"…`);

    this._super(...arguments);

    console.log(`finished playing “${this.title}"…`);
  }
});
```

---

### Creating an Instance
	by calling `create()` on the class, passing property values as a hash

---

```js
let song = Song.create({
  title: 'I will always love you',
  album: 'The Bodyguard Soundtrack'
});
```

---

### Native JavaScript classes
	will be possible to use soon but not for now

---

### Mixins
	can be used to reuse code without extending

---

```js
import EmberObject from '@ember/object';
import Mixin from '@ember/object/mixin';

const DebugMixin = Mixin.create({
  debug() {
    //return some debug info on the instance
  }
});

const Song = EmberObject.extend(DebugMixin, {
  play() {
    //🎤
  }
});

let song = Song.create();
song.debug();
// => some debug info on the instance
```

---

	Mixins are especially useful for reusing code in classes that already extend a base class, e.g. routes or components or where you want to reuse code in classes that have different base classes, e.g. routes and controllers

in both cases reuse via inheritance is not possible

---

### Initialization
	when an instance of a class is created, its `init()` method will be called 

---

```js
import EmberObject from '@ember/object';

const Song = EmberObject.extend({
  init() {
    this._super(...arguments);

    const { title } = this;
    console.log(`"${title}" is ready to play!`);
  }
});
```

using destructuring assignment here

---

	classes must make sure to call `this._super(...arguments)` in their implementation of `init()`
	failing to do so might break framework functionality

---

### Properties
	can be defined alongside methods

---

```js
import EmberObject from '@ember/object';

const Song = EmberObject.extend({
  debugInfo: 'I am an instance of the Song class.'
});
```

---

	Do not define array or object properties directly on the class as those are copied to the prototype then, meaning that all instances of the class would share the same exact object reference

---

```js
import EmberObject from '@ember/object';

const Song = EmberObject.extend({
  comments: []
});

const always = Song.create({
  title: 'I will always love you'
});
const greatest = Song.create({
  title: 'The Greatest Love of All'
});

always.comments.push('great song!');
greatest.comments
// => ['great song!']
```

---

	Instead define these kinds of properties in the `init()` method

---

```js
import EmberObject from '@ember/object';

const Song = EmberObject.extend({
  init() {
    this._super(...arguments);

    this.set('comments', []);
  }
});

const always = Song.create({
  title: 'I will always love you'
});

const greatest = Song.create({
  title: 'The Greatest Love of All'
});

always.comments.push('great song!');
greatest.comments
// => []
```

---

## Computed Properties

---

	Computed Properties are the core of Ember.js' binding system

---

	They allow defining properties as functions that are lazily executed when accessed

---

	Computed Properties are also the reason why you always have to use `object.set('<property>', value)` to update an object's properties

- (so that Ember.js can intercepts the call and update any Computed Properties if necessary)
- .get used to be necessary as well but is not anymore

---

```js
import EmberObject, { computed } from '@ember/object';

const Song = EmberObject.extend({
  // ℹ️ 'title', 'album', 'artist' are dependent keys
  fullTitle: computed('title', 'album', 'artist', function() {
    console.log('computing fullTitle...');
    const { title, album, artist } = this;

    // ℹ️ Computed Property's value
    return `${artist}: ${title} - ${album}`;
  })
});
```

we're using destructuring assignment here

---

```js
let song = Song.create({
  title:  'Greatest Love of All',
  album:  'The Ultimate Collection',
  artist: 'Whitney Houston'
});

song.fullTitle;
// logs 'computing fullTitle…'
// => 'Whitney Houston: Greatest Love of All - The
//     Ultimate Collection'
song.fullTitle;
// => 'Whitney Houston: Greatest Love of All - The
//     Ultimate Collection'
```

the computed property is not evaluated again when it's accessed the second time here

---

	Whenever any of the dependent properties changes, the computed property is reevaluated when accessed next - until then it returns a cached value

---

```js
let song = Song.create({
  title:  'Greatest Love of All',
  album:  'The Ultimate Collection',
  artist: 'Whitney Houston'
});

song.fullTitle;
// logs 'computing fullTitle…'
// => 'Whitney Houston: Greatest Love of All - The
//     Ultimate Collection’
song.set('artist', 'Whitney H.');
song.fullTitle;
// logs 'computing fullTitle…'
// => 'Whitney H.: Greatest Love of All - The
//     Ultimate Collection'
```

---

	The properties a Computed Property depends on can be Computed Properties themselves

so you can build a whole chain of computed properties that are all reevaluated when one or a few values change (this is actually a pretty common scenario)

---

### Computed Property getters and setters
	can be used to build more advanced Computed Properties

---

	to create a Computed Property that allows writing, instead of a function define it as an object with `get()` and `set()` methods

---

```js
import EmberObject, { computed } from '@ember/object';

const Song = EmberObject.extend({
  fullTitle: computed('title', 'album', 'artist', {
    get() {
      const { title, album, artist } = this;

      return `${artist}: ${title} - ${album}`;
    },
    set(key, value) {
      const [artist, title, album] = value.split(/[:-]/);

      this.setProperties({
        artist, title, album
      });
    }
  })
});
```

---

```js
let song = Song.create();

song.artist;
=> undefined
song.set(
  'fullTitle',
  `Whitney Houston: Greatest Love of All - The
Ultimate Collection`
);
song.artist;
=> 'Whitney Houston'
```

---

### Computed Properties and Arrays
	There are special keys for depending on Array properties

---

`.[]` marks a dependency on the set of elements in the array

---

```js
import EmberObject, { computed } from '@ember/object';

const Song = EmberObject.extend({
  isGreat: computed('comments.[]', function() {
    return this.comments.length >= 3;
  })
});
```

---

```js
let song = Song.create();

song.isGreat;
// => false

song.comments.pushObject('my favorite!');
song.comments.pushObject('love it!');
song.isGreat;
// => false

song.comments.pushObject('what a song!');
song.isGreat;
// => true
```

---

	`pushObject()` along with `popObject()`, `reverseObjects()`, `shiftObjects()` and `unshiftOjects()` are methods defined by Ember that make arrays work with the Computed Properties system

---

	Computed Properties that depend on arrays will not work when the native `push()`, `pop()` methods etc. are used to modify the array as Ember.js cannot intercept these calls to mark the Computed Property to be reevaluated on next access

---

	`.@each.<property>` marks a dependency  on the set of elements in the array as well as on the `<property>` property of each element

---

```js
import EmberObject, { computed } from '@ember/object';

const Album = Ember.Object.extend({
  songTitles: computed('songs.@each.name', function() {
    return this.songs.map(song => song.name);
  })
});
```

---

```js
const always = Song.create({
  title: 'I will always love you'
});
const greatest = Song.create({
  title: 'The Greatest Love'
});

let album = Album.create({
  songs: [always, greatest]
});

album.songTitles;
// => ['I will always love you', 'The Greatest Love']

greatest.set('title', 'The Greatest Love of All');
album.songTitles;
// => ['I will always love you', 'The Greatest Love of All']
```

---

### Computed Property Macros
	can be used to simplify many common use cases for Computed Properties

---

```js
import EmberObject, { computed } from '@ember/object';

const Song = EmberObject.extend({
  isGreat: computed('comments.[]', {
    return this.comments.length >= 3;
  })
});
```

---

```js
import EmberObject from '@ember/object';
import { gte } from '@ember/object/computed';

const Song = Ember.Object.extend({
  isGreat: gte('comments.length', 3)
});
```

---

	There are lots of built in macros

---

```js
import { 
  alias,
  and,
  or,
  equal,
  map,
  not,
  sum,
  ...
} from '@ember/object/computed';
```

---

## Observers

---

	Observers can be used to immediately react to property changes (as opposed to the laziness of Computed Properties)

---

```js
import EmberObject, { observer } from '@ember/object';

const Song = EmberObject.extend({
  isGreat: false,

  isGreatChanged: observer('isGreat', function() {
    if (this.isGreat) {
      console.log('this song is now great!');
    }
  })
});
```

---

```js
let song = Song.create();

song.set('isGreat', true);
// => logs 'this song is now great!'
```

---

	While observers are used heavily in Ember itself (e.g. to implement Computed Properties) they are almost never needed in application code

---

	Also there are a number of potential problems associated with observers so you should avoid them ~~whenever possible~~

---

## Demo
	https://github.com/simplabs/ember-workshop/tree/master/examples/object-model

---

## Practice Session
	Play around with the Object Model and get a feeling for how it works

---

/assets/MainMatter-logo-Negative.svg
size: contain

	https://mainmatter.com
	@mainmatter

/assets/About-blend.png
background: true
