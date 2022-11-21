# Ember.js Routing

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

/assets/Routing Overview.png
size: contain

---

### The Router
	describes the application's route hierarchy and maps URLs to Ember.js routes

---

/assets/Clipboard_2.png
size: contain

---

### Mapping URLs to Routes
	happens when the application starts up and every time the URL changes afterwards

---

	The URL can either be changed manually in the browser's address bar or whenever the user clicks a link in the application

---

### URLs
	Ember.js supports 3 different kinds of URLs

---

```js
export default class Router extends EmberRouter {
  location = config.locationType;
}
```

---

### `history`
	uses the browser's history API which allows standard URLs
	`http://example.com/songs`

---

### `hash`
	uses a hash to separate the server part of the URL from the part handled by Ember.js
	`http://example.com/#/songs`

---

### `none`
	does not synchronize the current application route with the browser URL; this is mainly used for testing

reloading the page results in the application starting at the index route again

---

	There is also the auto location type which will automatically choose the best option available in the current browser which is history, otherwise hash and none if both of the former are unavailable

---

	The location type to use is configured in `config/environment.js`

---

```js
var ENV = {
  locationType: 'auto'
};
```

---

### Routes
	are defined in `app/router.js` using the routing DSL

---

```js
Router.map(function() {
  this.route('albums');
});
```
	maps `/albums` to `app/routes/albums.js`

---

	The path for a route can be customized when it is not the same as the Ember.js route name
```js
Router.map(function() {
  this.route('albums', { path: '/my-music' });
});
```
	maps `/my-music` to `app/routes/albums.js`

---

	Routes can also be nested

---

```js
Router.map(function() {
  this.route('albums', function() {
    this.route('ratings');
  });
});
```
	maps `/albums/ratings` to `app/routes/albums/ratings.js`

---

### Dynamic Segments
	define placeholders in a route's path

---

```js
Router.map(function() {
  this.route('albums', function() {
    this.route('album', { path: '/:album_id' });
  });
});
```
	maps `/albums/1`, `/albums/2` etc. to `app/routes/albums/album.js`

the concrete value for the dynamic segment will be passed to the route then

---

### Wildcard URLs
	can be used to map multiple URLs to the same Ember.js route

---

```js
Router.map(function() {
  this.route('albums');
  this.route('not-found', { path: '*wildcard' });
});
```
	maps everything __but__ `/albums` to `app/routes/not-found.js`

---

### The application route
	is defined automatically without having to be specified in `app/router.js`

---

	The application route is the uppermost route of any Ember.js application which is entered when the application starts

---

#### Index routes
	are defined automatically for every level of nesting without having to be specified in `app/router.js`

---

```js
Router.map(function() {
  this.route('albums');
});
```
	is equivalent to
```js
Router.map(function() {
  this.route('index', { path: '/' });
  this.route('albums', function() {
    this.route('index', { path: '/' });
  });
});
```

---

## Templates and Outlet

---

	Nested routes are rendered hierarchically via outlets

---

	Each route which has nested routes can declare an outlet with the `{{outlet}}` helper in its respective template at the position where it wants templates of child routes to be rendered

---

```hbs
<div class="row">
  <div class="col-xs-12">
    {{outlet}}
  </div>
</div>
```
	templates of nested  routes will be rendered here

---

### Defining the Route Hierarchy
	by dissecting the UI

---

	Ember.js routing is not based on resources (e.g. not RESTful) as opposed to server routing but based on the UI and its structure

---

	In an Ember.js app, multiple routes are active at the same time (all routes that implement parts of the currently active UI hierarchy)

---

/assets/Clipboard_3.png
size: contain

---

/assets/Clipboard_4.png
size: contain

---

/assets/Clipboard_5.png
size: contain

---

/assets/Clipboard_6.png
size: contain

---

/assets/Clipboard_7.png
size: contain
`/music/queue`

if we switch to `/music/favorites`, the music and application routes don't change which means the player that is in the application route doesn't change and the music keeps playing

---

### Loading a Route's data
	is done in the route's `model` method

---

	The router calls the route's `model` method when it is entered

---

	As multiple routes are active at the same time, a transition might lead to multiple route's model methods being called

---

```js
Router.map(function() {
  this.route('albums', function() {
    this.route('album', { path: '/:album_id' });
  });
});
```

---

`http://localhost:4200/albums/1`
	=>
`http://localhost:4200/albums/2`
	calls the `albums.album` route's model method

---

`http://localhost:4200/`
	=>
`http://localhost:4200/albums/2`
	calls the `albums` as well as the `albums.album` route's model method

---

	This is how Ember.js restores the application state after page reloads - when the application is loaded at a specific path all of the model methods for the routes in the routes hierarchy run, thus loading all the data the application needs to restore the state encoded in the URL

---

	As the route's `model` methods load data they are asynchronous; that asynchrony is handled via promises

---

## Promises

---

	Promises represent eventual values; they either fulfill (successfully resolve the value) or reject (fail to resolve the value)

---

	Promises are used to simplify handling asynchronous logic and are part of ES2015

---

	A Promise is constructed with a method that takes two functions - one for resolving it, one for rejecting it

---

```js
new Promise((resolve, reject) => {
  // async operation…

  // on success
  resolve(value);

  // on failure
  reject(reason);
});
```

---

	Retrieving a promise's eventual value or handling rejection is done via its `then` method

---

```js
const promise = asyncOperation();

promise.then((value) => {
  // value holds the value the promise resolved with
}, (error) => {
  // handle the promise's rejection
});
```

---

	Promises can also be chained in order to perform multiple asynchronous operations sequentially

---

```js
loadUser()
.then(loadUserSettings)
.then(loadLocaleForSettings);
```

---

	Promise chains should have a trailing `catch` that handles errors that might be raised somewhere in the chain

---

```js
loadUser()
.then(loadUserSettings)
.then(loadLocaleForSettings)
.catch(handleError);
```

---

	Values returned from a resolve handler will be passed on to the next handler in the chain

---

```js
loadUser().then((json) => {
  return json.user;
}).then((user) => {
  // proceed with the user
});
```

---

### Running multiple promises in parallel
	with `Promise.all`

---

	`Promise.all` runs multiple promises in parallel and returns a promise itself that fulfills with an array of the values that all the passed promises fulfill with

---

```js
RSVP.all([
  loadUser(),
  loadSongs()
]).then((values) => {
  const [user, songs] = values;
})
```

---

### async/await

---

	Promise are a great primitive for working with asynchronicity but can be hard to work with

---

```js
loadUser()
.then(loadUserSettings)
.then(loadLocaleForSettings)
.catch(handleError);
```

- all callback based
- what does loadUser return and thus what gets passed in to loadUserSettings etc.?

---

	`async`/`await` is a new language feature that allows turning promise based code into callback-free, sequential code

---

```js
try {
  let user = await loadUser();
  let setting = await loadUserSettings(user);
  let locale = await loadLocaleForSettings(settings);
} catch(e) {
  handleError(e);
}
```

---

	`await` can only be used in functions that are declared as async

---

```js
async function setupUI() {
  try {
    let user = await loadUser();
    let setting = await loadUserSettings(user);
    let locale = await loadLocaleForSettings(settings);
  } catch(e) {
    handleError(e);
  }
}
```

---

## Loading a Route's data
	with `async`/`await`

---

	Whenever the application transitions to a new route, the router invokes the `beforeModel`, `model` and `afterModel` methods of the target route

---

`beforeModel` -> `model` -> `afterModel`

---

	The router awaits these async methods before making the transition and entering the route

---

`beforeModel`
	is used to perform tasks that need to happen before the model is loaded or that might lead to the model not being loaded at all

---

```js
export default class MyRoute extends Route {
  beforeModel(transition) {
    if (!this.isAuthenticated) {
      transition.abort();
      this.transitionTo('login');
    }
  }
}
```
	`transition.abort()` aborts the transition; there's also retry to retry an aborted transition later, e.g. after the user logged in

---

`model`
	loads the route's data

---

`http://localhost:4200/albums`
```js
export default class AlbumsRoute extends Route {
  async model() {
    let albums = await loadAlbums();
    return albums;
  }
}
```

---

`http://localhost:4200/albums/1`
```js
export default class AlbumRoute extends Route {
  async model(params) {
    let album = await loadAlbum(params.album_id);
    return album;
  }
}
```

---

	A route can reuse the models of all routes that are higher in the route hierarchy (as their `model` methods will already have run)

---

`http://localhost:4200/albums/1`
```js
export default class AlbumRoute extends Route {
  model(params) {
    const albums = this.modelFor('albums');

    return albums.find((a) => a.id === params.album_id);
  }
}
```

we're just looking up the album for the `id` in the array of the already loaded albums here and save a request

---

`afterModel`
	is used to redirect after the model was loaded or to perform tasks that need to happen after the model was loaded; this method is called with the resolved model

---

`http://localhost:4200/albums`
```js
export default class AlbumsRoute extends Route {
  afterModel(model) {
    if (model.length === 1) {
      this.transitionTo('albums.album', model[0]);
    }
  }
}
```

---

### The loading state
	is managed by the router based on the promises returned by the routes

---

	While the promise returned by the route's `model` method (and potentially `beforeModel` and `afterModel`) have not resolved, the loading state for the respective route is entered

---

	When entering the loading state for a route, the router calls the `loading` action on that route

---

```js
export default class AlbumsRoute extends Route {
  @action
  loading() {
    // handle the loading state somehow
 }
}
```

---

`http://localhost:4200/albums/1`
	will render the first of these loading templates that is defined (in that order):
	1. `albums.album-loading`
	1. `albums.loading`
	1. `loading`

---

	Each route's loading template is rendered into the outlet that its regular template is rendered into, allowing nested loading indicators

---

/assets/Clipboard_8.png
size: contain

---

/assets/Clipboard_9.png
size: contain

---

### The error state
	is managed by the router similar to the loading state

---

	Whenever a promise returned by a route's `model` method (or `beforeModel` or `afterModel`) rejects, the error state for the respective route is entered

---

	When entering the error state for a route, the router calls the error action on that route

---

```js
export default class AlbumsRoute extends Route {
  @action
  error() {
    // handle the error somehow
 }
}
```

---

	Routes can also define `error` templates that are rendered following the same rules as for `loading` templates

---

`http://localhost:4200/albums/1`
	will render the first of these error templates that is defined (in that order):
	1. `albums.album-error`
	1. `albums.error`
	1. `error`

---

### Query Parameters
	allow binding properties to the query string

---

	Query Parameters allow for additional state to be serialized into the URL that does not fit in the path; typical use cases are pagination, sorting or filtering

---

	Query Parameters are defined on the controller backing a route's template

---

```js
export default AlbumsController extends Controller {
  queryParams = ['sortBy'];
  @tracked sortBy = null;

  get sortedAlbums() {
    if (this.sortBy) {
      return this.model.sortBy(this.sortBy);
    } else {
      return this.model;
    }
  }
}
```

---

	Query Parameters can be specified with `<LinkTo>` as well as `transitionTo` and `transitionToRoute`

---

```hbs
<LinkTo @route="albums" @query={{hash sortBy="title"}}>
  Albums
</LinkTo>
```

```js
this.transitionTo('albums', { queryParams: { sortBy: 'year' }});
```

---

	Query parameters can also be configured to trigger a model reload in the route when changed

---

```js
export default class AlbumsRoute extends Route {
  queryParams = {
    sortBy: {
      refreshModel: true
    }
  }
}
```

---

## Demo
https://github.com/simplabs/ember-workshop/tree/master/examples/routing

Use the Ember Inspector to have a look at the internals of the demo application

---

## Practice Session
	Add a route that displays a single album by its ID as well as a loading route (make sure the `model` method does not resolve immediately)

// https://github.com/simplabs/ember-workshop/commit/af83eb6cbffaa0a205b5321acc9c0d01fd726ef5
 
reuse the route data from the previous step)

// `git reset --hard step-1`

---

/assets/MainMatter-logo-Negative.svg
size: contain

	https://mainmatter.com
	@mainmatter

/assets/About-blend.png
background: true