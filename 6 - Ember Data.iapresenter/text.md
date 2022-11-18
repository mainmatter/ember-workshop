# Ember Data

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

### Ember Data is Ember's data persistence framework

This is comparable to the ORM in server applications

---

### Totally optional

It is also totally optional. It's not actually required to use Ember Data to build an Ember.js application but most applications have some sort of underlying data model that also needs to be persisted

---

### Ember Data is included by default in every application created with Ember CLI

Although you can use other solutions like Orbit.js or Apollo for GraphQL etc.

---

## Overview

---
1. Application interacts with the model and the store
1. The store uses adapters (which internally use serializers) to read and write models
1. The adapter interacts with the backend

/assets/Clipboard_1.png
size: contain

---

## Models

---

### Models define the structure of the application's data

All persistent data that an application uses should generally be represented as models.

---

### Models live in the application's `app/models/` folder

---

##  Defining models

---

### Define a new model by extending Model

Model extends from Ember.Object and thus models are just regular Ember objects with added model functionality.

---

New classes are defined by extending one of Ember.js' predefined classes

```js
//app/models/song.js
import Model from '@ember-data/model';

export default class Song extends Model {
}
```

---

## Attributes

---

### Defined using `@attr`

---

```js
import Model, { attr } from '@ember-data/model';

export default class Song extends Model {
  @attr name;
  @attr coverUrl;
}
```

---

Model attributes can be used like any other property.

```js
let song = this.store.createRecord('song', {
  name: 'The Greatest Love of All'
});

song.name;
// => 'The Greatest Love of All'

song.name = 'I will always love you';
song.name;
// => 'I will always love you'
```

Ignore the specifics of `store.createRecord` for now...

---

## Transforms

---

	- Supports attribute types via transforms that implement serialization/deserialization for values
	- Comes with a set of standard transforms for common types
	- The application can also implement its own transforms in `app/transforms/`

---

### String
```js
"1" => "1"
1 => "1"
```

---

### Number
```js
1 => 1
1.1 => 1.1
"1.1" => 1.1
NaN => null
```

---

### Boolean
```js
false => false
true => true
null => false
"true" => true
"f" => false
0 => false
```

---

### Date
```js
"2015-01-01T00:00:00.000Z" => Date
1420070400000 => Date
null => null
```

---

	When no attribute type is specified no transform is used and attribute values are used unmodified

This is generally good enough and I’d mainly use transforms for cases where you need some kind of advanced serialization/deserialization

---

### Default Values
	can be defined for attributes

---

```js
import Model, { attr } from '@ember-data/model';

export default class Song extends Model {
  @attr name;
  @attr coverUrl;
  @attr({ defaultValue: 0}) rating;
}
```
	Set `rating` to `0` by default

---

## Relationships
	Defined using `hasMany` and `belongsTo`

---

### `hasMany`
	defines a to-many relationship

---

```js
import Model, { attr, hasMany } from '@ember-data/model';

export default class Album extends Model {
  @attr name;
  @attr coverUrl;

  @hasMany songs;
}
```
	An album has many songs

---

### `belongsTo`
	defines a to-one relationship

---

```js
import Model, { attr, belongsTo } from '@ember-data/model';

export default class Song extends Model {
  @attr name;

  @belongsTo album;
}
```
	a song belongs to an album

---

	Relationships are typically defined on both sides of the relationship (as in the previous example)
there is no `hasOne` – simply use `belongsTo` on both sides

---

### Models can also have relationships to themselves

---

This example models threaded comments. In this case the inverse relationship must be specified.

```js
import Model, {
  attr,
  belongsTo,
  hasMany
} from '@ember-data/model';

export default class Comment extends Model {
  @attr text;

  @hasMany({ inverse: 'parent' }) children;
  @belongsTo({ inverse: 'children' }) parent;
}
```

---

### Relationships and Promises
	getting a relationship from a model returns a promise that resolves with the associated model(s)

---

```js
let song = await this.store.findRecord('song', 1);

let comment = await song.comments;
```
	Here `await song.comments` *might* trigger a backend request

The first line loads the song - ignore specifics for now

---

	As related models have potentially not yet been loaded from the backend when accessed, getting them is actually an asynchronous operation and thus returns a promise

---

## The Store

---

### The store is used to find and create model instances

---

### It is available as a service that can be injected wherever

---

### Finding models
	The store's `findRecord` and `findAll` methods retrieve one or all models of a specific type from the backend
	Both methods return promises of course as they (potentially) require requests to the backend

We'll see later why "potentially"

---

```js
let song = await this.store.findRecord('song', 1);

let songs = await this.store.findAll('song');
```

These methods return promises

---

This is what happens when reading a record for the first time:

/assets/Clipboard_2.png
size: contain

---

	- If the models are already present in the store the returned promise will resolve right away
	- Ember Data will make a backend request in the background and update the returned record(s) once it gets a response

---

This happens when reading the same record a second time:

/assets/Clipboard_3.png
size: contain

---

	There is always only one model instance per type and id in the store so that any change to a model is always visible throughout the application

This mechanism is an „Identity Map“
The store is often referred to as the „Single Source of Truth“

---

### Querying models
	The store's query and queryRecord method can be used to retrieve one or all models of a type that match the specified query

But of course, this needs to be supported by the backend

---

```js
let song = await this.store.queryRecord('song', {
  filter: { name: 'The Greatest Love of All' }
});

let songs = this.store.query('song', {
  filter: { artist: 'Whitney Houston' }
});
```

These methods return promises
of course the server needs to support these queries

---

### Creating models
	Models are created via the store's `createRecord()` method

---

```js
let song = this.store.createRecord('song');
```

---

	`createRecord()` accepts values for attributes like `EmberObject.create()` ~~does~~ did

---

```js
let song = this.store.createRecord('song', {
  name: 'The Greatest Love of All'
});
```

---

### Saving models
	Models are saved via their `save()` method

---

	Calling `save()` on a model issues a network request to the backend

---

```js
let song = this.store.createRecord('song', {
  name: 'The Greatest Love of All'
});

// Triggers a backend request
await song.save();
```

In this case a `POST` request would be issued by default

---

This will issue a `PATCH` request by default. Notice that we're working with an existing record, not creating a new one like in the previous example.

```js
let song = await this.store.findRecord('song', 1);
song.name = 'The Greatest Love of All';

await song.save();
```

---

### Validation Errors
	The backend might reject a model and respond with validation errors

---

	- These validation errors are exposed via the model's `errors` property
	- If the model has errors, its `isValid` property will return false

---

```js
let song = this.store.createRecord('song');

try {
  await song.save();
} catch(e) {
  song.errors.name;
  // => ['must be present']
  song.isValid;
  // => false
}
```

---

### Tracking changed Attributes
	is possible via the model

---

	The `hasDirtyAttributes` property returns a boolean indicating whether the model has any dirty (changed but unsaved) attributes

---

```js
let song = await this.store.findRecord('song', 1);
song.name = 'The Greatest Love of All';
song.hasDirtyAttributes;
// => true

await song.save();
song.hasDirtyAttributes;
// => false
```

---

	The `changedAttributes()` method returns an object containing all dirty attributes with their old and new values

---

```js
let song = await this.store.findRecord('song', 1);
song.name = 'The Greatest Love of All';
song.changedAttributes();
// => { name: ['I will always love you', 'The Greatest Love of All'] }
```

---

### Reverting changes
	is possible via the model's `rollbackAttributes()` method

---

```js
let song = await this.store.findRecord('song', 1);
song.name = 'The Greatest Love of All';
song.hasDirtyAttributes;
// => true

song.rollbackAttributes();
song.hasDirtyAttributes;
// => false
song.name;
// => 'I will always love you'
```

---

### State flags
	identify the current state of the record

---

### `isNew`
	is true when the model was created with createRecord and has not yet been saved

---

```js
let song = this.store.createRecord('song');
song.isNew;
// => true

await song.save();
song.isNew;
// => false
```

---

### `isSaving`
	is `true` when the model has been saved but the request to the backend has not returned yet

---

We're continuing after initiating the save, then only awaiting the promise later

```js
let song = this.store.createRecord('song');

let saveProgress = song.save();
song.isSaving;
// => true

await saveProgress;

song.isSaving;
// => false
```

---

### Deleting models
	is possible via the model

---

	The model's `deleteRecord()` method marks the model as deleted (but does not actually delete it in the backend)

---

```js
let song = await this.store.findRecord('song', 1);

song.deleteRecord();
song.isDeleted;
// => true

await song.save(); // now deleted on the server as well
```

---

	The model's `destroyRecord()` combines marking the model as deleted and actually deleting it in the backend

---

```js
let song = await this.store.findRecord('song', 1);

await song.destroyRecord();
// the song is now deleted on the server
```

---

## Adapters and Serializers

---

	- Adapters are responsible for retrieving and submitting data from and to the backend
	- Adapters usually build URLs, choose the correct request methods, set request headers etc.

„usually“ as an adapter could actually persists data locally, e.g. in localStorage as we’ll see later

---

	Serializers are responsible for serializing and deserializing data into and from the format expected and provided by the backend

---

/assets/Clipboard_4.png
size: contain

---

/assets/Clipboard_5.png
size: contain

---

## JSON:API

---

	Ember Data works best with JSON:API which it also uses internally to store data in the store

---

/assets/Clipboard_6.png
size: contain
	[https://jsonapi.org](https://jsonapi.org)

---

	JSON API is a specification for building JSON based REST APIs

---

The logo is not actually valid JSON ;)

/assets/Clipboard_7.png
size: contain

---

### Resource Objects
	represent individual resources

---

```
GET /songs/1

{
  "data": {
    "type": "songs",
    "id": "1",
    "attributes": {
      "name": "The Greatest Love of All"
    }
  }
}
```
	Things inside the `data` object constitute the resource object

---

```
GET /songs

{
  "data": [
    {
      "type": "songs",
      "id": "1",
      "attributes": {
        "title": "The Greatest Love of All"
      }
    },
    {
      "type": "songs",
      "id": "2",
      "attributes": {
        "title": "I will always love you"
      }
    }
  ]
}
```
	In this example, there are 2 resource objects stored under the `data` array

---

	Relationships can be included in the response to save requests

---

```
GET /songs/1

{
  "data": {
    "type": "songs",
    "id": "1",
    "attributes": {
      "name": "The Greatest Love of All"
    },
    "relationships": {
      "comments": {
        "data": [{
          "type": "comments",
          "id": "1"
        }]
      }
    }
  },
  "included": [{
    "type": "comments",
    "id": "1",
    "attributes": {
      "text": "Great song!"
    }
  }]
}
```
	The included resource object is stored inside the `included` key

---

### Writing is analogous

---

```
POST /songs

{
  "data": {
    "type": "songs",
    "attributes": {
      "title": "The Greatest Love of All"
    }
  }
}
```

Of course there's no ID in this case as we're just creating the record

---

```
HTTP/1.1 201 Created
Location: http://example.com/songs/1

{
  "data": {
    "type": "songs",
    "id": "1",
    "attributes": {
      "title": "The Greatest Love of All"

    }
  }
}
```

---

### Custom adapters/serializers
	can be used to support all kinds of backends

---

	- There are some ready-to-use adapters and serializers
	- [http://emberobserver.com/categories/ember-data-adapters](http://emberobserver.com/categories/ember-data-adapters)
	- This is a complex topic though and would be worth a workshop by itself - we will assume JSON API

Even some for storing data in e.g. `localStorage`

---

### Choosing an adapter and serializer
	by defining them in `app/adapters/application.js` and `app/serializers/application.js`

---

```js
// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
}
```

---

```js
// app/serializers/application.js
import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONAPISerializer {
}
```

---

	Adapters and serializers can be configured by overriding properties
```js
// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapters/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = 'https://api.example.com';
}
```

---

	Adapters and serializers can also be customized per model by defining ones with matching names, e.g. `app/adapters/song.js`, `app/serializers/song.js`

---

## Ember CLI's mock server

---

	For development it's nice not having to use a real backend server as that might be unstable, not finished yet or you might be offline ✈️

---

	Ember CLI provides a mock server mechanism that you can use to develop against

---

	The mock server also has the advantage that it can be easily implemented so that it returns just the data that's needed to implement e.g. a specific feature

---

	When using JSON API using a mock server is easy as it is clear how the responses you will eventually get from the real backend are going to look

Hooray for standards 🥳

---

	Generate a mock server with Ember CLI's generator:
	`ember g http-mock songs`
```
/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var songsRouter = express.Router();

  songsRouter.get('/', function(req, res) {
    res.send({
      data: [
        {
          id: '1',
          type: 'song',
          attributes: {
            name: 'The Greatest Love of All'
          }
        }
      ]
    });
  });

  app.use('/api/songs', songsRouter);
};
```

---

	Configure the application adapter to use the mock server:
```js
// app/adapters/application.js
import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api';
}
```

---

# Demo
	[https://github.com/simplabs/ember-workshop/tree/master/examples/ember-data](https://github.com/simplabs/ember-workshop/tree/master/examples/ember-data)

Use the Ember Inspector to have a look at the internals of the demo application

---

# Practice Session
	Add models for albums and songs and load them from the backend

// [https://github.com/simplabs/ember-workshop/commit/daaa87697a5f64effa5e4d159a6e5a25b0355ded](https://github.com/simplabs/ember-workshop/commit/daaa87697a5f64effa5e4d159a6e5a25b0355ded)

(there’s a dev server running in your example app, namespace is `/api`)

// `git reset --hard step-2`